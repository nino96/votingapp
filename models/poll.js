
let mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
// let connection = mongoose.connect('process.env.MONGODB_URI || mongodb://localhost/votingapp', {useNewUrlParser: true});
var QuestionSchema = require('./question').schema;

autoIncrement.initialize(mongoose.connection);

var PollSchema = new mongoose.Schema({
    pollid: {type: Number, required: true},
    userid: {type: Number, required: true },
    name : {type: String, required : true},
    isActive: {type: Boolean,required: true},
    questions: [QuestionSchema]
});



PollSchema.plugin(autoIncrement.plugin, { model: 'Poll', field: 'pollid' });

module.exports = mongoose.model('Poll', PollSchema);
