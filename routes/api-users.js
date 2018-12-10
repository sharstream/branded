const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const db = require("../models");

// Load Input Validation
const validatedRegisterInput = require('../validation/register');
const validatedLoginInput = require('../validation/login');
// Routes
// =============================================================
module.exports = router => {

  // @route   GET /test
  // @desc    Test routers
  // @access  Public
  router.get("/test", (req, res) => res.json({ msg: 'Router working' }));

  // @route   GET api/users/register
  // @desc    Register user
  // @access  Public
  router.post("/api/users/register", (req, res) => {
    const { errors, isValid } = validatedRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm' // default
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        db.User.create(
          Object.assign(req.body, { password: hash, avatar, date: Date.now() })
        ).then(user => {
          res.json(user);
        }).catch(err => {
          return res.status(400).send(err);
        });
      });
    });
  });

  // @route   POST /login
  // @desc    login
  // @access  Private
  router.post("/api/users/login", (req, res) => {
    const { errors, isValid } = validatedLoginInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    db.User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          errors.email = 'User not found'
          return res.status(404).json(errors);
        } else {
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                const payload = { id: user.id, name: user.name,
                avatar: user.avatar }; // create JWT Payload

                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    })
                  }
                )
              } else {
                errors.password = 'Password incorrect'
                return res.status(400).json(errors);
              }
            })
        }
      })
  });

  // @route   GET /current
  // @desc    Return current user
  // @access  Private
  router.get("/api/users/current",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      })
    });
}