/**
 * Created by Houssem on 06/12/2017.
 */
const  express = require('express');
const app = express();
const router = require("./serveur/routes/router");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const PORT = 80;
const ADRESS = "localhost"
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use("/public",express.static('public'));
app.use('/',router);

app.listen(PORT, function () {
    console.log('demarrage du serveur sur le port '+PORT+' !');
    console.log('http://'+ADRESS+':'+PORT);
});