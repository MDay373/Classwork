const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const messages = require(__dirname +"/export/hello.js");
const Person = require(__dirname + "/schema/Person.js");

mongoose.connect('mongodb://localhost:27017/People', {useNewUrlParser:true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("We're connected!")
});

var app = express();
app.set("view engine", hbs);
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/partials");

app.use(express.urlencoded({extended:false}));
/*
messages.hello();
messages.goodbye();
*/

app.get('/people', function(req,res){
    Person.find({firstName: "Jim"}, function(err, data){
        if (err) return handleError(err);
        console.log(data);
    })
})

Person.updateMany({})
      

app.get('/', function(req,res){
    res.send("hello");
    var myPerson = new Person({firstName: "Jim", 
                        lastName:"Davis", 
                        age:50})

    myPerson.save(function(err, person){
        if (err) return handleError(err);
        console.log("Saved" + person);
    })
})

app.listen(3000, function(){
    console.log("Listening on Port 3000")
})


