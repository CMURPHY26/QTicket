//Dependencies
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const db = mongoose.connection;
////Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || process.env.LOCALPORT;



//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//For user session login
app.use(session({
    secret: process.env.SECRET, //some random string
    resave: false,
    saveUninitialized: false
}));



//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:'+ `27017/ticketsdb`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useUnifiedTopology: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{
    console.log("connected to mongo");
});

const ticketsController = require("./controllers/tickets.js");
const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");
const resolvedTicketsController = require("./controllers/resolve.js");


// any routes that come in for tickets should be sent
// to the ticketsContoller
app.use("/tickets", ticketsController);
app.use("/users", usersController);
app.use("/sessions", sessionsController);
app.use("/resolved", resolvedTicketsController);


const Ticket = require("./models/tickets.js");
const User =  require("./models/users.js");

//___________________
// Routes
//___________________
//localhost:3000 
app.get('/' , (req, res) => {
    res.redirect("/sessions/new");
  });

app.get("/seed", (req, res) => {
    User.create(
      {
      isAdmin:false,
      username:"laurenl",
      password:"$2b$10$N2gHjrzjj/m2kqADiOdk6ewBX2IqYMwGq..ReFkX5mw1jhPVuI1rm"
    }, (err, createdUser) => {
      console.log(createdUser)
    });

  Ticket.create(
    [
    { 
      resolved:false,
      name:"New 1",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"New 2",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {resolved:false,
      name:"New 3",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"New 4",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"New 5",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"New 6",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {resolved:false,
      name:"New 7",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"New 8",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"New 9",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"New 10",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    }
    ], (err, createdTickets) =>{
    console.log(createdTickets)
    res.redirect("/");
  });
});


//   wildcard route
app.get("*", (req, res) => {
    if(!req.session.currentUser) {
      res.redirect("/");
    }
  });


  // Web server:
//Listener
app.listen(PORT, () => console.log( 'Listening on port:', PORT));