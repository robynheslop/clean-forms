const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    clinicName: {
        type: String,
        index: true,
        unique: true,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: Number,
        required: true
    }, 
});

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;