/**
 * Created by Houssem on 18/12/2017.
 */
const path = require('path');
const User = new require('../model/model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserDBMapper = require("../model/user-model").UserDBMapper;

let gameController = {
    index : function (req, res) {
        res.send('Hello World!');
    },
    game:function(req,res){
        res.sendFile(path.join(__dirname + '/../views/htmlFiles/game.html'));
    },
    recruter:function(req,res){
        res.sendFile(path.join(__dirname + '/../views/jsonFiles/recruter.json'));
    },
    producteur:function(req,res){
        res.sendFile(path.join(__dirname + '/../views/jsonFiles/producteur.json'));
    },
    constructeur:function(req,res){
        res.sendFile(path.join(__dirname + '/../views/jsonFiles/constructeur.json'));
    },
    planConstruction:function(req,res){
        res.sendFile(path.join(__dirname + '/../views/jsonFiles/plan_construction.json'));
    },
    transfertConnaissance:function(req,res){
        res.sendFile(path.join(__dirname + '/../views/jsonFiles/transfert_connaissance.json'));
    },
    update:function(req,res){
        let done = (err,isUpdated)=>{
            res.send(isUpdated);
        };
        req.body.id = req.user.id;
        let user = new UserDBMapper(req.body);
        let date = new Date().toLocaleString('fr-FR', {timeZone: 'Europe/Paris'});
        user.last_update = date;
        User.save(user,done);
    },

}
let userController={
    user:function (req,res) {
        res.header("content-type : text/javascript");
        let date = new Date().toLocaleString('fr-FR', {timeZone: 'Europe/Paris'});
        let user = req.user;
        delete user.id;
        delete user.username;
        delete user.password;

        user.params.currentDate = date;
        res.json(user);
    },
    login:function (req,res) {
        res.sendFile(path.join(__dirname + '/../views/htmlFiles/login.html'));
    },
    logout:function (req,res) {
        req.logout();
        res.redirect('/login');
    },
    register:function (req,res) {
        res.sendFile(path.join(__dirname + '/../views/htmlFiles/register.html'));
    },
    createUser:function (req,res) {
        if(req.body.username == undefined || req.body.password == undefined || req.body.username == "" || req.body.password == "")
            res.redirect("/register");

        let newUser = new UserDBMapper(
            {
                username:req.body.username,
                password:req.body.password
            },true);

        let done = function (err,isInserted) {
            res.redirect("/login");
        }

        User.save(newUser,done);
    },
    test:function (req,res) {
        let done = (err,user)=>{
            let date = new Date().toLocaleString('fr-FR', {
                timeZone: 'Europe/Paris'
            });
            res.send(date);
        }
        let user = User.getUserById(1,done)
    }
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false);
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

let controllers = {
  gameController:gameController,
    userController:userController
};
module.exports = controllers;