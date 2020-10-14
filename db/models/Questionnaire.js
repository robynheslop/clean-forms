const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    pretext: {
        type: String
    },
    questions: [ questionSchema ], 
    postText: {
        type: String
    }, 
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;