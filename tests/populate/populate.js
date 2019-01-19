const { ObjectID } = require("mongodb");

const { User } = require("./../../models/User");

const userIds = [new ObjectID(), new ObjectID()];

const users = [
  {
    _id: userIds[0],
    name: "Barsik Cat",
    email: "barsik.cat@mail.meow",
    password: "catPassword",
    avatar: ""
  },
  {
    _id: userIds[1],
    name: "Test User",
    email: "test.user@gmail.test",
    password: "testTestTest"
  }
];

const populateDB = done => {
  User.remove({})
    .then(() => {
      var Users = [new User(users[0]).save(), new User(users[1]).save()];

      return Promise.all(Users);
    })
    .then(() => done());
};

module.exports = { users, populateDB };
