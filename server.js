const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Project config
const config = require("./config");

// routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);

app.listen(process.env.PORT, err => {
  if (!err) console.log(`Listen on port ${process.env.PORT}`);
});
