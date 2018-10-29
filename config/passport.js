const jwtStrategy = require("passport-jwt").Strategy;
const jwtExtract = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");

const options = {};
options.jwtFromRequest = jwtExtract.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.secret;

module.exports = passport => {
  passport.use(
    new jwtStrategy(options, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch(e => console.log(e));
    })
  );
};
