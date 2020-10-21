const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../db/models");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars")
require("dotenv").config();

const router = express.Router();

router.post("/signup", (request, response) => {
    const user = new db.User({
        username: request.body.username,
        password: request.body.password
    });
    user.save()
        .then(() => {
            const token = jwt.sign({ id: user.id }, "jwt_secret");
            response.json({ token })
        })
        .catch(error => {
            response.status(500).json("Could not create user");
        })
});

router.post("/login", passport.authenticate("local", { session: false }),
    (request, response) => {
        const token = jwt.sign({ id: request.user.id }, "jwt_secret");
        response.json({ token, userId: request.user.id })
    });

router.get("/user", passport.authenticate("jwt", { session: false }), (request, response) => {
    if (!request.user) {
        response.json({ username: "nobody" })
    } else {
        response.json({
            clinicname: request.user.username,
            email: request.user.email
        })
    }
});

router.get("/clinics/:owner", (request, response) => {
    db.Clinic.find(
        { owner: request.params.owner },
        (error, clinics) => {
            if (error) response.status(500).json("Could not find clinics");
            if (!clinics) {
                response.status(500).json("Could not find clinics");
            }
            response.json(clinics);
        })
})

router.post("/new-clinic", async (request, response) => {
    try {
        const clinic = new db.Clinic({
            owner: request.body.owner,
            clinicname: request.body.clinicname,
            email: request.body.email,
            phone: request.body.phone
        });
        const newClinic = await clinic.save()
        response.json(newClinic);
    } catch (error) {
        response.status(500).json(error);
    }
})

// creat new booking
router.post("/new-booking", (request, response) => {
    const booking = new db.Booking(request.body);
    booking.save()
        .then(booking => {
            response.json(booking)
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("Could not create booking");
        })
})

// get all bookings made by a clinic
router.get("/bookings/:clinic", (request, response) => {
    db.Booking.find(
        { clinic: request.params.clinic },
        (error, bookings) => {
            if (error) response.status(500).json("Could not find bookings");
            if (!bookings) {
                response.status(500).json("Could not find bookings");
            }
            response.json(bookings);
        })
})

// get all questionnaires belonging to a user
router.get("/questionnaires/:owner", async (request, response) => {
    try {
        const questionnaire = await db.Questionnaire.find(
            { owner: request.params.owner })
        response.json(questionnaire);
    }
    catch (error) {
        response.status(500).json(error);
    }
})

// create a new questionnaire
router.post('/questionnaire', async (request, response) => {
    try {
        const createQuestionnaire = await db.Questionnaire.create(
            { ...request.body })
        response.json(createQuestionnaire);
    }
    catch (error) {
        response.status(500).json(error)
    }
})

// update questionnaire -- second release
router.put('/questionnaire/:id', async (request, response) => {
    db.Questionnaire.findOneAndUpdate(
        { id: request.params.id },
        request.body,
        { new: true, upsert: true },
        function (error, questionnaire) {
            if (error) return response.status(500).json("Could not create questionnaire");
            if (!questionnaire) return response.status(500).json("Could not create questionnaire");
            return response.json(questionnaire);
        });
})

// delete questionnaire -- second release
router.delete('/questionnaire/:id', async (request, response) => {
    try {
        const deleteQuestionnaire = await db.Questionnaire.findByIdAndDelete(
            { owner: request.params.owner })
        response.json(deleteQuestionnaire)
    }
    catch (error) {
        response.status(500).json.error;
    }
})

// create a new screening document
router.post('/new-screening', async (request, response) => {

    try {
        const createScreening = await db.Screening.create(
            { questionnaire: request.body.questionnaire })
        response.json(createScreening);
    }
    catch (error) {
        response.status(500).json(error)
    }
})

// dispatch screening request email to client
router.post('/screening-request', async (request, response) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false,
        auth: {
            user: 'cleanforms@yahoo.com',
            pass: process.env.NODE_MAILER || process.env.EMAILPASSWORD
        }
    });

    transporter.use("compile", hbs({
        viewEngine: {
            layoutsDir: "./views",
            defaultLayout: false
        },
        viewPath: "./views"
    }))

    const mailOptions = {
        from: '"Clean Forms" <cleanforms@yahoo.com>',
        to: request.body.email,
        subject: `COVID Declaration for your apppointment at ${request.body.clinicName}`,
        template: "emailTemplate",
        context: {
            clientName: request.body.clientName,
            clinicName: request.body.clinicName,
            clinicPhone: request.body.clinicPhone,
            screeningId: request.body.screeningId,
            link: `www.cleanforms.com/${request.body.screeningId}`,
        }
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) return response.status(500).json(error, info);
        response.status(200).json("Message sent: " + info.messageId);
    })


});

// get screening by ID -- to then get questionnaire for client to complete
router.get('/screening/:id', async (request, response) => {
    db.Screening.findOne(
        { _id: request.params.id },
        function (error, screening) {
            if (error) return response.status(500).json("Could not find screening");
            return response.status(200).json(screening);
        });

});

// get questionnaire by id to display in screening for client
router.get("/screening/questionnaire/:id", async (request, response) => {
    db.Questionnaire.findOne(
        { _id: request.params.id },
        function (error, questionnaire) {
            if (error) return response.status(500).json("Could not find questionnaire");
            if (!questionnaire) {

                response.status(500).json("Could not find questionnaire in store");
            }
            return response.json(questionnaire);
        });
})

// update screening with responses and status
router.patch('/screening/:id', async (request, response) => {
    db.Screening.findOneAndUpdate(
        { _id: request.params.id },
        { ...request.body },
        function (error, screening) {
            if (error) {
                console.log(error)
                return response.status(500).json("Could not update screening")
            };
            if (!screening) {
                return response.status(500).json("Could not update screening in store");
            }
            return response.json(screening);
        });
});

// update screening with responses and status
router.patch('/booking', async (request, response) => {
    console.log('id', request.body._id)
    db.Booking.findOneAndUpdate(
        { screeningId: request.body._id },
        { status: request.body.status },
        function (error, booking) {
            if (error) return response.status(500).json("Could not update booking");
            if (!booking) {
                return response.status(500).json("Could not update booking in store");
            }
            console.log('booking',booking)
            return response.json(booking);
        });
});

module.exports = router;