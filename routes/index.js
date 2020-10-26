const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../db/models");
const nodemailer = require("nodemailer");
const isEqual = require('lodash.isequal');
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
            response.status(200).json({ token })
        })
        .catch(error => {
            response.status(500).json(error);
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
            clinicName: request.user.username,
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

router.post("/new-clinic", (request, response) => {
    const clinic = new db.Clinic({
        owner: request.body.owner,
        clinicName: request.body.clinicName,
        email: request.body.email,
        phone: request.body.phone
    });
    clinic.save()
        .then(clinic => {
            response.json(clinic)
        })
        .catch(error => {
            response.status(500).json("Could not create clinic");
        })
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
            response.status(500).json("Could not create booking.");
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

// delete questionnaire
router.delete('/questionnaire/:id', async (request, response) => {
    console.log('request.params.id', request.params.id);
    try {
        const res = await db.Questionnaire.deleteOne(
            { id: request.params.id })
        response.json(res.ok);
    }
    catch (error) {
        console.log('error', error)
        response.status(500).json('Could not delete questionnaire.');
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
        response.status(500).json("Could not create screening.")
    }
})

// dispatch screening request email to client
router.post('/screening-request', (request, response) => {
    console.log('request.body', request.body)
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
            bookingDate: request.body.date,
            clinicName: request.body.clinicName,
            clinicPhone: request.body.phone,
            screeningId: request.body.screeningId,
            link: `www.cleanforms.com/${request.body.screeningId}`,
        }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return response.status(500).json("Could not send screening request.");
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
router.patch('/screening/:_id', async (request, response) => {
    const { responses } = request.body;
    try {
        const screeningData = {
            responses
        }
        const screening = await db.Screening.findOne({ _id: request.params._id })
        const questionnaire = await db.Questionnaire.findOne({ _id: screening.questionnaire })
        const { questions } = questionnaire;
        
        const formattedQuestions = questions.map(({ id, responses }) => {

            return {
                [id]: responses.map(response => {
                    return {
                        id: response.id,
                        checked: response.isValidResponse ? true : false
                    }
                })

            }
        })
        console.log('screeningData.responses',screeningData.responses)
        console.log('formattedQuestions',formattedQuestions)
        if (isEqual(screeningData.responses, formattedQuestions)) {
            screeningData.status = "passed"
        } else {
            screeningData.status = "failed"
        }
        await db.Screening.findOneAndUpdate(
            { _id: request.params._id },
            {
                responses: screeningData.responses,
                status: screeningData.status
            }
        )
        await db.Booking.findOneAndUpdate(
            { screeningId: request.params._id },
            { status: screeningData.status }
        )
        return response.status(200).json(screeningData.status);
    }
    catch (error) {
        console.log(error)
        return response.status(500).json("Could not update screening.")
    }


});

module.exports = router;