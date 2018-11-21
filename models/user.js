let mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var UserSchema = new mongoose.Schema({
    userid: {type: Number, required: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});


UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userid' });

module.exports = mongoose.model('User', UserSchema);