const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User Model
const { User } = require("../../models/User");

/**
 * @path POST api/users/register
 * @desc Register user
 * @access Public
 */
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ email: "Email already exists!" });
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

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
