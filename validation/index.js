const usersValidateFunctions = require("./users.js");
const profileValidateFunctions = require("./profile.js");
const postsValidateFunctions = require("./posts.js");

validate = {
  users: usersValidateFunctions,
  profile: profileValidateFunctions,
  posts: postsValidateFunctions
};

module.exports = validate;
