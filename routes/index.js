const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../db/models")

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
router.get("/questionnaire/:owner", async (request, response) => {
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
            { owner: request.params.owner },
            { ...request.body.formData })
        response.json(createQuestionnaire);
    }
    catch (error) {
        response.status(500).json(error)
    }
})

// create a new questionnaire
router.put('/questionnaire/:id', async (request, response) => {
    try {
        const update = await db.Questionnaire.updateOne(
            { owner: request.params.owner },
            { ...request.body.formData })
        response.json(update)
    }
    catch (error) {
        response.status(500).json.error;
    }
})

// create a new questionnaire
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

module.exports = router;