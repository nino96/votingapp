require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/votingapp');

let mongoose = require('mongoose');
let router = require('express').Router();

let Poll = require('../models/poll');
let Question = require('../models/question');

router.get('/:pollId', (req, res, next) => {
    console.log("Inside GET Polls");
    //console.log("Got Request "+req.params.pollId);
    Poll.find({"pollid": req.params.pollId}).exec((err, polls) => {
        console.log(polls);
        return res.status(200).json(polls);
    });
});

router.post('/addQuestionToPoll', (req, res, next) => {
    var topic = req.body.topic;
    var choices = req.body.choices;
    var pollid = req.body.pollid;

    var q = new Question({
        topic: topic,
        choices: choices
    });

    Poll.findOne({pollid:pollid}, function(err, poll){
        poll.questions.push(q);
        poll.save().then(poll => {
            return res.status(200).json(poll);
        });
    });

    //return res.status(200);

});

router.post('/createPoll', (req, res, next) => {
    // mongoose.connect("process.env.MONGODB_URI || mongodb://localhost/votingapp");
    // var conn = mongoose.connection;

    // var ObjectID = require('mongodb').ObjectID;
    var poll = {
        name: req.body.pollname,
        questions:[],
        userid:req.body.userid,
        isActive:true
    };

    Poll.create(poll).then((poll)=>{
        return res.json(poll);
    })
    // conn.collection('polls').save(poll, function(poll){
    //     console.log(poll);
    //     return res.json(poll);
    // });
});
    
router.post('/closePoll',(req, res, next) => {
    // mongoose.connect("process.env.MONGODB_URI || mongodb://localhost/votingapp");
    // var conn = mongoose.connection;
    var pollid = req.body.pollid;
    // var ObjectID = require('mongodb').ObjectID;
    Poll.findOne({pollid:pollid}, function(err, poll){
        poll.isActive = false;
        poll.save().then(poll => {
            return res.status(200).json(poll);
        });
    });
});

router.post('/:pollId/:questionId/vote', (req, res, next) => {

    const pollId = req.params.pollId;
    const questionId = req.params.questionId;

    const choice = req.body.choice;
    const identifier = `questions.$.choices.${choice}.votes`;

    console.log("PollID: "+pollId+" QuestionId : "+questionId);

    Poll.update({'questions._id':questionId}
        , {$inc: {[identifier] : 1}}, {}, (err, numberAffected) => {
        let Pusher = require('pusher');

        console.log("APP ID:"+process.env.PUSHER_APP_ID+" KEY "+process.env.PUSHER_APP_KEY+" SECRET "+process.env.PUSHER_APP_SECRET);
        let pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_APP_KEY,
            secret: process.env.PUSHER_APP_SECRET,
            cluster: process.env.PUSHER_APP_CLUSTER
        });

        let payload = { pollId: pollId, choice: choice, questionId: questionId };
        pusher.trigger('poll-events', 'vote', payload, req.body.socketId);
    //     Poll.update({ _id: pollId, 
    //     questions: { 
    //         $elemMatch: { _id: questionId}
    //     } 
    //   }, 

    //   { $inc: { 

    //     [identifier]:1

    //    }});    


         res.send('');
    });

});

module.exports = router;
