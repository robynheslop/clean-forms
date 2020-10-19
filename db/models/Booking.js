const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    clinic: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
        index: true,
        minlength: 2,
        maxlength: 20,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    screeningId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "Incomplete"
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;