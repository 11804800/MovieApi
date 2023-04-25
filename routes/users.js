var express = require('express');
var router = express.Router();
const User = require('../models/userSchema');
const bodyparser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
router.use(bodyparser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.delete('/', function (req, res, next) {
  User.remove({})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('content-type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('content-type', 'application/json');
            res.json({ err: err });
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json({ success: true, status: "Registration Successfull" });
          });
        });
      }
    });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('content-type', 'application/json');
      res.json({ success: false, status: "Login Failed", err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('content-type', 'application/json');
        res.json({ success: false, status: "Login Failed", err: "Can't Login" });
      }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      res.json({ success: true, status: "Logged in", token: token });
    });
  })(req, res, next);
});

module.exports = router;
