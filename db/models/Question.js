const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        required: true
    },
    responseOptions: {
        type: Array,
        required: true
    }, 
    correctOption: {
        type: String,
        required: true
    }
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;