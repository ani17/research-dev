var express = require('express');
var router = express.Router();

/* Front-end Routes */
router.get('/todos', function(req, res) {
	res.render('index',{});
});

router.get('/users', function(req, res) {
    res.render('users',{user:req.session.user});
});

router.get('/chat/:id', function(req, res) {
    console.log(req.params.id);
    console.log(req.session.user[0]._id);
    res.render('chat',{reciever_id : req.params.id, sender_id : req.session.user[0]._id});
});


router.get('/login', function(req, res) {
    res.render('login',{});
});

/* API Routes */
router.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

// create todo and send back all todos after creation
router.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        name : req.body.name,
        createdOn : new Date()
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

//user creation

router.get('/api/users', function(req, res) {

        // use mongoose to get all todos in the database
        Users.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all todos in JSON format
        });
    });

router.post('/api/users', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Users.create({
        name : req.body.name,
        mobile : req.body.mobile,
        createdOn : new Date()
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Users.find(function(err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });

});

//load user chat
router.get('/api/chat/:id', function(req, res) {

        // use mongoose to get all todos in the database
        // var ObjectId = require('mongodb').ObjectID;
        console.log(req.session.user[0]._id);
        console.log(req.params.id);

        Chat.find({$or:[{sender:req.session.user[0]._id},{sender:req.params.id}]},function(err, chat) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(chat); // return all todos in JSON format
        });
    });


router.post('/api/sendmsg', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Chat.create({
        sender : req.body.sender,
        reciever : req.body.reciever,
        message : req.body.message,
        createdOn : new Date()
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Chat.find(function(err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });

});

// login


router.post('/api/login', function(req, res) {

        // get and return all the todos after you create another
        
        Users.find({mobile:req.body.mobile},function(err, users) {
            if (err)
                res.send(err)

            req.session.user = users;
            res.json(users);
        });

});



module.exports = router;
