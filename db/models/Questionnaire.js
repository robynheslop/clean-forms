const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    preText: {
        type: String
    },
    questions: {
        type: Array
    }, 
    postText: {
        type: String
    }, 
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;