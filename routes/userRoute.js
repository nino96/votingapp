let router = require('express').Router();
var mongoose = require("mongoose");

let User = require('./../models/user');
let Poll = require('./../models/poll');

router.post('/login', (req, res, next) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email, password:password}).exec((err, user) => {
        console.log(user);
        return res.json(user);
    });
});

router.post('/createUser', (req, res, next) => {

    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/votingapp");
    var conn = mongoose.connection;
    // var Schema = mongoose.users;
    
    // var userSchema = new Schema({
    //      name: String,
    //      email: String,
    //      password: String
    //  });
      
     
    //  var User = mongoose.model("User", Schema);
    //  console.log(User)
    //  var user = new User(req.body);
     
    //  user.save(function(error) {
    //      console.log("Your user has been saved!");
    //  if (error) {
    //      console.error(error);
    //   }
    //  });
    //  return user;
    // var ObjectID = require('mongodb').ObjectID;
    // var user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     _id: new ObjectID()
    // };
    // conn.collection('users').insert(user);
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.create(user);
    res.send('');

});

router.post('/getPolls', (req, res, next) => {

    var userId = req.body.userId;

    Poll.find({"userid": userId}).exec((err, polls) => {
        console.log(polls);
        return res.status(200).json(polls);
    });

    
});

module.exports = router;