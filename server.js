const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// Project config
const config = require("./config");

// routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app = express();

// Mongodb
mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err));

// Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
require("./config/passport.js")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(expres.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.on("dbConnected", function() {
  app.listen(process.env.PORT, err => {
    if (!err) {
      console.log(`Listen on port ${process.env.PORT}`);
      app.emit("appStarted");
    }
  });
});

mongoose.connection.once("open", function() {
  app.emit("dbConnected");
});

module.exports = { app };
