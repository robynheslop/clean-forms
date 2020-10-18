const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../db/models")
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
            console.log(error.message)
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

router.post("/new-clinic", (request, response) => {
    const clinic = new db.Clinic({
        owner: request.body.owner,
        clinicname: request.body.clinicname,
        email: request.body.email,
        phone: request.body.phone
    });
    clinic.save()
        .then(clinic => {
            response.json(clinic)
        })
        .catch(error => {
            console.log(error.message)
            response.status(500).json("Could not create clinic");
        })
})

// creat new booking
router.post("/new-booking", (request, response) => {
    console.log("request body", request.body)
    const booking = new db.Booking(request.body);
    booking.save()
        .then(booking => {
            response.json(booking)
        })
        .catch(error => {
            console.log(error.message)
            response.status(500).json("Could not create booking");
        })
})

// get all bookings made by a clinic
router.get("/bookings/:clinic", (request, response) => {
    console.log(request.params.clinic)
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
    console.log(request.body);
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

    // const questionnaire = new db.Questionnaire(request.body)
    // console.log('questionnaire', questionnaire)
    // questionnaire.save()
    //     .then(questionnaire => {
    //         response.json(questionnaire)
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //         response.status(500).json("Could not create questionnaire");
    //     })


    db.Questionnaire.findOneAndUpdate(
        { id: request.params.id },
        request.body,
        { upsert: true },
        function (error, questionnaire) {
            if (error) return response.status(500).json("Could not create questionnaire");
            return response.json(questionnaire);
        });


    // console.log(questionnaire)
    // db.Questionnaire.updateOne(
    //     { id: request.params.id },
    //     { questionnaire }, 
    //     { upsert: true },
    //     (error, updatedQuestionnaire) => {
    //         if (error) return response.status(500).json(error);
    //         if (!updatedQuestionnaire) {
    //             return response.status(500).json("Could not save questionnaire");
    //         }
    //         return response.json(updatedQuestionnaire);
    //     })
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
            { questionnaireId: request.body.questionnaireId })
        response.json(createScreening);
    }
    catch (error) {
        response.status(500).json(error)
    }
})

// dispatch screening request email to client
router.post('/screening-request', async (request, response) => {
    console.log(request.body)
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 587,
            secure: false,
            auth: {
                user: 'cleanforms@yahoo.com',
                pass: process.env.EMAILPASSWORD
            }
        });

        transporter.use("compile", hbs({
            viewEngine: {
                layoutsDir: "./views",
                defaultLayout: 'emailTemplate'
            },
            viewPath: "./views"
        }))

        const mailOptions = {
            from: '"Clean Forms" <cleanforms@gmail.com>',
            to: request.body.clientEmail,
            subject: `COVID Declaration for your apppointment at ${request.body.clinicname}`,
            context: {
                clientName: request.body.clientName,
                clinicName: request.body.clinicName,
                clinicPhone: request.body.clinicPhone,
                clinicEmail: request.body.clinicEmail,
                link: `www.cleanforms.com/${request.body.screeningId}`,
            }
        }

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
            console.log("Message sent: " + info.messageId);
        })

        response.status(200)
    }
    catch (error) {
        response.status(500).json.error;
    }
});

// get screening by ID -- to then get questionnaire for client to complete
router.get('/screening/:id', async (request, response) => {
    try {
        const screening = await db.Screening.find(
            { _id: request.params.id })
        response.json(screening);
    }
    catch (error) {
        response.status(500).json(error);
    }

});

// get questionnaire by id to display in screening for client
router.get("/questionnaires/:id", async (request, response) => {
    try {
        const questionnaire = await db.Questionnaire.find(
            { _id: request.params.id })
        response.json(questionnaire);
    }
    catch (error) {
        response.status(500).json(error);
    }
})

// update screening with responses and status
router.put('/screening/:id', async (request, response) => {
    try {
        const updateScreening = await db.Screening.findOneAndUpdate(
            { _id: request.params.id },
            {
                responses: request.body.responses,
                status: request.body.status
            })
        response.json(updateScreening);
    }
    catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;