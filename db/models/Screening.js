const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema({
    questionnaire: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Incomplete"
    },
    responses: {
        type: Object
    }
});

const Screening = mongoose.model("Screening", screeningSchema);

module.exports = Screening;