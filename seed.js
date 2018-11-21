require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/votingapp');

    const topics = [
        "Should dogs be allowed to fly?",
        "Should doors be shut at night?",
        "Should developers use IDEs?",
        "Should cars have four wheels?",
        "Should humans be allowed to wear shoes?"
    ];
    let User = require('./models/User');
    const Poll = require('./models/poll');
    const Question = require('./models/question');

    User.deleteMany({})
        .then(() => {
            // var user = new User({});
            // user.username = "Atharva";
            // user.password = "abc";
            // user.email = "def";
        
            // return user.save();
            users=[];
                users.push(
                    {
                    name: "Atharva",
                    email: "Atharva@gmail.com",
                    password: "abcd"});
                users.push(
                    {name: "Niyam",
                    email: "Niyam@gmail.com",
                    password: "abcd"});
                users.push(
                    {name : "Samriddhi",
                    email: "Samriddhi@gmail.com",
                    password: "abcd"});
                    
            
            return User.create(users);
        })
        .then(() => {
            process.exit();
        })
        .catch((e) => {
            console.log(e);
            process.exit(1);
        });


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
            poll.name = "Test Poll";
            poll.userid= 15;
            poll.isActive=true;
            poll.questions.push(q);
        }

        // var poll2 = new Poll({});    
        // for (let i = 0; i < 5; i++) {

        //     var q = new Question({
        //         topic: topics[i],
        //         choices: [
        //             {
        //                 value: "Yes",
        //                 votes: Math.round(Math.random() * 20)
        //             },
        //             {
        //                 value: "No",
        //                 votes: Math.round(Math.random() * 20)
        //             },
        //             {
        //                 value: "I really don't care",
        //                 votes: Math.round(Math.random() * 20)
        //             }
        //         ]
        //     });
        //     poll2.name = "Test Poll 2";
        //     poll2.userid= 12;
        //     poll2
        //     poll2.questions.push(q);
        // }

        
        return poll.save();

         
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });