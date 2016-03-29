//express is a web framwork/ NPM module for NodeJS, which gives additional functionalities and APIs on top of Node. Makes writing web servers and APIs easy
var express = require('express');

//body-parser is an NPM module which allows you to parse and access data sent to the server from POST requests
var bodyParser = require('body-parser');

//An NPM module which allows your Node server to access your database. MongoDB driver for NodeJS
var MongoClient = require('mongodb').MongoClient

var app = express(); //Creating an instance of express

//HTTP module has functions to create a web server.
var http = require('http').Server(app); //Use the express functionalities with your web server

var url = 'mongodb://localhost:27017/myAppDb'; //Mention the DB name used in your application, in this case DB name is myAppDb

MongoClient.connect(url, function(err, db) { //Connect to your DB.

    //Once connected to your DB, control is now inside this function. The first line in this function just prints 'connected to database'
    console.log("Connected to database");

    //In which folder is your front-end JS / CSS / images ? This line tells that all of my JS/CSS/images are within the 'public' directory
    app.use(express.static('./public'));

    //Tells your web server to make use of the body-parser package, and access data sent in POST requests
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    //Tells the server to listen to any GET requests to '/'
    app.get('/', function(req, res) {
        //Once request to '/' is got, this line tells the server to send back an HTML page to browser
        res.sendFile(__dirname + '/index.html');
    });

    //Tells the server to listen to any GET requests coming to '/home'
    app.get('/home', function(req, res) { //function gets called if request to '/home' arrives
        
        //this line tells the server to send a <h1> tag to browser to print 'hello world'
        res.send('<h1>Hello world</h1>');
    });

    //Tells the server to listen to any GET requests coming to '/welcome'
    app.get('/welcome', function(req, res) { //function gets called if request to '/home' arrives

        console.log("Request to welcome"); //Prints the message in the terminal

        //Create an Object, whose key is 'message' and key's value is 'Good afternoon'
        var greeting = {
            message: "Good afternoon"
        };
        //Send the object back to the browser in the form of JSON
        res.json(greeting);
    });

    //Tells the server to listen to requests coming to '/gettodolist'
    app.get('/gettodolist', function(req, res) { //function gets called if request to '/gettodolist' arrives

        //Get all documents/objects saved in "todoList" collection, whose name is "ashwin". Change the name to your own name

        db.collection("todoList").find({
            name: "ashwin"
        }).toArray(function(err, results) {//Function gets called after getting all documents
            //Prints the array of objects
            console.log(results); 

            //Create an object, whose key is 'todos' and key's value is the results array
            var todoList = {
                allTodos: results
            };
            //Send response back to browser
            res.json(todoList);
        })
    });

    //Tells the server to listen to any POST requests coming to '/savetodos'
    app.post('/savetodos', function(req, res) { //function gets called if request to '/savetodos' arrives

        //Prints the request body.
        console.log(req.body);  //Request body contains data sent from browser from the POST request

        //Insert the data from req.body into the 'todoList' collection in MongoDB
        db.collection("todoList").insert({
            name: req.body.name,
            todo: req.body.todo
        }, function() { //This function gets called after insertion
            var message = {
                status: "Todo is saved successfully"
            }
            //Send a response back to the browser saying that todo is saved
            res.json(message)
        });
    });

    var portNumber = 3000;

    //Runs the web server on Port 3000
    http.listen(portNumber, function() { //Function gets called after server is started
        console.log('Server running on port: '+ portNumber);
    });
});

console.log("hello");