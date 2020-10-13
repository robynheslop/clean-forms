const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    clinic: {
        type: String,
        required: true,
    },
    clientname: {
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
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "incomplete"
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;