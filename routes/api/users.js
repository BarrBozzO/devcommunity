const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load User Model
const { User } = require("../../models/User");
// Validation
const validate = require("../../validation").users;

/**
 * @path POST api/users/register
 * @desc Register user
 * @access Public
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validate.register(req.body);

  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm" // default
      });

      const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar
      });

      newUser
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err));
    }
  });
});

/**
 * @path POST api/users/login
 * @desc Login user / Returning JWT
 * @access Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validate.login(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        jwt.sign(
          payload,
          process.env.secret,
          { expiresIn: 3600 * 24 },
          (err, token) => {
            if (!err)
              return res.json({ success: true, token: "Bearer " + token });
            else return res.status(400).json({});
          }
        );
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

/**
 * @path GET api/users/current
 * @desc Return user
 * @access Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
