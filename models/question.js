
let mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    topic: String,
    choices: [
        {
            value: String,
            votes: Number
        }
    ]   
});

module.exports = mongoose.model('Question', QuestionSchema);
