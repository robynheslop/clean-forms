const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        minlength: 2,
        maxlength: 20,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    } else {
        bcrypt.hash(user.password, 10, (error, encrypted) => {
            if (error) return next(error);
            user.password = encrypted;
            return next();
        })
    }
});

userSchema.methods.login = function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;