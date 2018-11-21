#!/usr/bin/env node

require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/votingapp', { useNewUrlParser: true });

const topics = [
    "Should dogs be allowed to fly?",
    "Should doors be shut at night?",
    "Should developers use IDEs?",
    "Should cars have four wheels?",
    "Should humans be allowed to wear shoes?"
];

const Poll = require('./models/poll');
const Question = require('./models/question');

// empty the collection first
Poll.deleteMany({})
    .then(() => {
        //let polls = {};

        var poll = new Poll({});    
        for (let i = 0; i < 5; i++) {

            var q = new Question({
                topic: topics[i],
                choices: [
                    {
                        value: "Yes",
                        votes: Math.round(Math.random() * 20)
                    },
                    {
                        value: "No",
                        votes: Math.round(Math.random() * 20)
                    },
                    {
                        value: "I really don't care",
                        votes: Math.round(Math.random() * 20)
                    }
                ]
            });
            poll.userid = 1;
            poll.questions.push(q);
        }
        return poll.save();
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
