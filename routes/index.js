const express =require("express");
const passport =require("passport");
const jwt = require("jsonwebtoken");
const User= require("../db/models/User")

const router = express.Router();

router.post("/signup", (request, response) => {
    const user = new User({
        username: request.body.clinicname, 
        email: request.body.email,
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
    (request,response) => {
        const token = jwt.sign({id: request.user.id}, "jwt_secret");
        console.log("token",token);
        response.json({token:token})
});

router.get("/user", passport.authenticate("jwt", { session: false }), (request, response) => {
    if (!request.user) {
        response.json({clinicname: "nobody"})
    } else {
        response.json({
            clinicname: request.user.username,
            email: request.user.email
        })
    }
});

module.exports = router;