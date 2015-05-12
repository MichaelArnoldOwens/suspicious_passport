var express = require('express');
var router = express.Router();
var passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome!')
});

router.get('/login_success', function(req, res){
  res.send('login succeedz!');
});

router.get('/auth/google', passport.authenticate('google',  
    { scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){} // this never gets called
);

router.get('/oauth2callback', passport.authenticate('google',  
    { successRedirect: '/login_success', failureRedirect: '/login' }
));

module.exports = router;
