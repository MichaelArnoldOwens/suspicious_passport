var express = require('express');
var router = express.Router();
var passport = require('passport')
/* GET home page. */
//home page
router.get('/', function(req, res, next) {
  res.send('Welcome!')
});


//login success route
router.get('/login_success', function(req, res){
  res.send('login succeedz!');
});

//login fail route
router.get('/login_fail', function(req, res){
  res.send('login failed!');
});

//authenticate
router.get('/auth/google', passport.authenticate('google',  
    { scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){} // this never gets called
);

//redirect after authenticate
router.get('/oauth2callback', passport.authenticate('google',  
    { successRedirect: '/api', failureRedirect: '/login_fail' }
));

router.get('/api',  
    ensureAuthenticated,
    function(req, res) {
        res.send('Hooray! welcome to our api!');
    }
); 

function ensureAuthenticated(req, res, next) {  
    if (req.isAuthenticated()) { return next(); }
    res.sendStatus(401);
};

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
