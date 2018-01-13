/**
 * Created by Houssem on 06/12/2017.
 */
const  express = require('express');
const controllers = require('../contloller/controller');
const passport = require('passport');


var router = express.Router();

router.get('/',controllers.gameController.index );
router.get('/game',ensureAuthenticated,controllers.gameController.game);
router.get('/recruter',ensureAuthenticated,controllers.gameController.recruter);
router.get('/producteur',ensureAuthenticated,controllers.gameController.producteur);
router.get('/constructeur',ensureAuthenticated,controllers.gameController.constructeur);
router.get('/universite',ensureAuthenticated,controllers.gameController.universite);
router.get('/plan_construction',ensureAuthenticated,controllers.gameController.planConstruction);
router.get('/transfert_connaissance',ensureAuthenticated,controllers.gameController.transfertConnaissance);
router.get('/universite_shadok',ensureAuthenticated,controllers.gameController.universiteShadok);

router.get('/register',controllers.userController.register);
router.get('/login',controllers.userController.login);
router.get('/logout',ensureAuthenticated,controllers.userController.logout);
router.get('/user',ensureAuthenticated,controllers.userController.user);

router.post('/update',ensureAuthenticated,controllers.gameController.update);
router.post('/login',passport.authenticate('local', {successRedirect:'/game', failureRedirect:'/login'}),
    function(req, res) {
        res.redirect('/game');
    });
router.post('/register',controllers.userController.createUser);



function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}


module.exports = router;