const express =require("express");
const passport =require("passport");
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
        const token = jwt.sign({id: user.id}, "jwt_secret");
        response.json({token})
    })
    .catch(error => {
        console.log(error.message)
        response.status(500).json("Could not create user");
    })
});

router.post("/login", passport.authenticate("local", { session: false }), 
    (request, response) => {
        const token = jwt.sign({id: request.user.id}, "jwt_secret");
        response.json({token, userId: request.user.id})
});

router.get("/user", passport.authenticate("jwt", { session: false }), (request, response) => {
    if (!request.user) {
        response.json({username: "nobody"})
    } else {
        response.json({
            clinicname: request.user.username,
            email: request.user.email
        })
    }
});

router.get("/clinics/:owner", (request, response) => {
    db.Clinic.find(
        {owner: request.params.owner}, 
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

module.exports = router;