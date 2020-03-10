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
const adminTicketsController = require("./controllers/admin.js");
const sessionsController = require("./controllers/sessions.js");
const resolvedTicketsController = require("./controllers/resolve.js");



// any routes that come in for tickets should be sent
// to the ticketsContoller
app.use("/tickets", ticketsController);
app.use("/users", usersController);
app.use("/admin", adminTicketsController);
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
      [
        {
        isAdmin:false,
        username:"laurenl",
        password:"$2b$10$N2gHjrzjj/m2kqADiOdk6ewBX2IqYMwGq..ReFkX5mw1jhPVuI1rm"
        },
        {
          isAdmin:false,
          username:"stephaniem",
          password:"$2b$10$N2gHjrzjj/m2kqADiOdk6ewBX2IqYMwGq..ReFkX5mw1jhPVuI1rm"
        },
        {
          isAdmin:false,
          username:"brianl",
          password:"$2b$10$N2gHjrzjj/m2kqADiOdk6ewBX2IqYMwGq..ReFkX5mw1jhPVuI1rm"
        },
        {
          isAdmin:false,
          username:"allenf",
          password:"$2b$10$N2gHjrzjj/m2kqADiOdk6ewBX2IqYMwGq..ReFkX5mw1jhPVuI1rm"
        },
        {
          isAdmin:true,
          username:"chrism",
          password:"$2b$10$N2gHjrzjj/m2kqADiOdk6ewBX2IqYMwGq..ReFkX5mw1jhPVuI1rm"
        }
    ], (err, createdUser) => {
      console.log(createdUser)
    });

  Ticket.create(
    [
    { 
      resolved:false,
      name:"My Laptop Crashed",
      request:"Leggings polaroid four dollar toast banh mi DIY marfa affogato tote bag brooklyn wayfarers yuccie umami aesthetic slow-carb. Chia gastropub gochujang roof party la croix. Pour-over cred small batch woke listicle shoreditch. Street art copper mug poutine lo-fi disrupt swag, hashtag yr bitters kickstarter art party godard bushwick brunch. Art party bespoke vape, succulents stumptown irony quinoa sustainable cold-pressed bushwick cray ennui vexillologist. Hammock literally man braid kickstarter selvage.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"Please add this button to the website",
      request:"Woke sustainable cronut, pitchfork celiac umami fixie butcher gentrify twee brooklyn street art 3 wolf moon franzen. Raw denim fashion axe scenester, mixtape pitchfork air plant cornhole gentrify. Fashion axe tousled cardigan, tilde photo booth poke four loko waistcoat lomo. Skateboard intelligentsia forage, hexagon photo booth iPhone single-origin coffee +1. Shaman DIY meh, farm-to-table enamel pin distillery fingerstache vice williamsburg hoodie organic sartorial hella.",
      username:"laurenl"
    },
    {resolved:false,
      name:"New Netfork Folder Needed",
      request:"Neutra austin lumbersexual tilde. Williamsburg pabst franzen pok pok craft beer. Drinking vinegar locavore fashion axe ramps portland meggings bushwick lo-fi edison bulb. Copper mug cornhole PBR&B messenger bag. Trust fund lyft vinyl cliche synth, squid adaptogen fingerstache art party kinfolk blue bottle everyday carry green juice fashion axe.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"Website Redesign",
      request:"Hoodie scenester affogato irony readymade, vegan wolf sartorial umami listicle edison bulb try-hard 90's. Schlitz distillery pitchfork ugh shaman vape pork belly kogi helvetica single-origin coffee. Readymade subway tile brunch pop-up mixtape drinking vinegar 90's selfies lumbersexual. Chicharrones meh pok pok, butcher mustache portland seitan kitsch migas copper mug kombucha. Helvetica adaptogen activated charcoal celiac, next level poke roof party neutra lomo seitan trust fund aesthetic austin selvage crucifix. Brunch poutine chia schlitz listicle banh mi kitsch.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"HELP!!!!!!",
      request:"Asymmetrical yuccie YOLO taxidermy pitchfork direct trade. Photo booth glossier sustainable vexillologist authentic. Heirloom coloring book fingerstache, photo booth seitan ramps tofu gochujang. Kickstarter typewriter williamsburg aesthetic normcore ugh listicle kombucha taiyaki. Ramps actually ethical, letterpress trust fund celiac cardigan food truck 3 wolf moon farm-to-table stumptown gluten-free. Vegan chillwave pabst, yr flexitarian master cleanse iceland heirloom hoodie cold-pressed cloud bread.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"Change website ecommerce platform",
      request:"Taxidermy raw denim kale chips roof party enamel pin normcore VHS XOXO dreamcatcher organic iPhone deep v taiyaki shaman. Before they sold out man braid vaporware, yuccie ramps affogato snackwave tilde. Intelligentsia raclette forage woke, messenger bag deep v subway tile. Health goth iPhone squid tbh small batch knausgaard, palo santo keytar franzen bespoke poutine sriracha readymade cloud bread.",
      username:"laurenl"
    },
    {resolved:false,
      name:"BLUE SCREEN OF DEATH!!!!",
      request:"Air plant wolf VHS tumblr 90's hoodie, intelligentsia DIY post-ironic narwhal sartorial mumblecore forage. Sriracha iceland street art shoreditch microdosing, venmo etsy drinking vinegar kitsch polaroid single-origin coffee health goth slow-carb. Mumblecore wayfarers green juice snackwave. Messenger bag portland iPhone four dollar toast echo park, try-hard cred small batch brunch butcher tousled subway tile bitters. Beard plaid woke, tofu pitchfork mixtape viral brunch af banh mi meggings. Bushwick stumptown offal migas, art party flannel selvage. Gochujang quinoa YOLO portland.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"OH GOD PLEASE HELP!!!!!",
      request:"Hexagon hella 3 wolf moon, 8-bit hoodie banh mi street art church-key cronut shaman typewriter pok pok fashion axe. Banh mi locavore brooklyn, tbh aesthetic activated charcoal adaptogen taiyaki viral woke shabby chic live-edge. Typewriter cold-pressed letterpress literally artisan 90's farm-to-table health goth brooklyn skateboard gochujang. Artisan iPhone next level air plant. Locavore hammock air plant gentrify, messenger bag DIY thundercats umami pour-over taiyaki austin literally cliche. Man braid skateboard pour-over, raclette tacos pork belly viral disrupt occupy art party put a bird on it marfa lomo twee. Forage cardigan +1 brooklyn ugh activated charcoal, blog skateboard dreamcatcher bushwick offal chicharrones humblebrag intelligentsia.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"Add website plugin",
      request:"Ethical fashion axe cred, taiyaki gastropub viral bespoke chartreuse salvia enamel pin pug master cleanse. Retro authentic keytar cray pop-up vape church-key williamsburg fam tumeric freegan tacos thundercats. Four dollar toast chillwave street art fashion axe authentic forage, vegan XOXO gluten-free knausgaard. Listicle hell of XOXO offal woke microdosing. Meh umami ethical, cardigan la croix street art master cleanse salvia etsy.",
      username:"laurenl"
    },
    {
      resolved:false,
      name:"IT TECH ASSISTANCE",
      request:"Hella palo santo neutra asymmetrical pinterest la croix. Freegan paleo hoodie, tousled asymmetrical hashtag listicle. 3 wolf moon distillery knausgaard tumeric, twee XOXO bicycle rights dreamcatcher brunch sartorial food truck. Polaroid snackwave yr, PBR&B intelligentsia disrupt raclette vice gluten-free sartorial coloring book.",
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