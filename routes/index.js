
var express = require('express');
var passport= require("passport") ;
var router = express.Router();
var userModel = require("./users") ;


const localStrategy = require("passport-local");
const { authenticate } = require("passport");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index2');
});
router.get('/original', function(req, res) {
  res.render('index2');
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

router.get('/collection', function(req, res, next) {
  res.render("collection");
});

router.get('/doctor', function(req, res, next) {
  res.render("doctor");
});


router.get('/emergency', function(req, res, next) {
  res.render("emergency");
});
router.get('/drone', function(req, res, next) {
  res.render("drone");
});

router.get('/appointment', function(req, res, next) {
  res.render("appointment");
});

router.get('/community', function(req, res, next) {
  res.render("community");
});

router.get('/collectionItem', function(req, res, next) {
  res.render("collectionItem");
});

router.get('/donate', function(req, res, next) {
  res.render("donate");
});


module.exports = router;






// npm i passport passport-local passport-local-mongoose express-session mongoose
//auhentication



/* GET home page. */


router.get("/profile", isLoggedIn, function (req, res, next) {
  userModel
    .findOne({
      username: req.session.passport.user,
    })
    .then((loginuser) => {
      res.render("index", {loginuser});
      // res.send("user login") ;
    });
});

router.post("/signup", (req, res) => {
  var data = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    address: req.body.address,
    mobileNumber: req.body.mobileNumber
  });
  userModel
    .register(data, req.body.password)
    .then(function (u) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/signin");
      });
    })
    .catch(function (e) {
      res.send(e);
    });
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
  // res.send("done")

});






router.post("/signin",passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});





function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}
module.exports = router;