const expect = require("expect");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const { users, populateDB } = require("./populate/populate");
const { app } = require("./../server");
const { User } = require("./../models/User");

const agent = request.agent(app);

before(function(done) {
  app.on("appStarted", done);
});

beforeEach(populateDB);

describe("/API/USERS", function() {
  describe("POST api/users/register", function() {
    it("Should register a user", done => {
      let newUser = {
        email: "mcgregor@email.hell",
        password: "AWf,m3arf,",
        password2: "AWf,m3arf,",
        name: "McGregor"
      };

      request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBeTruthy();
          expect(res.body.email).toBe(newUser.email);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          User.findOne({ email: newUser.email })
            .then(user => {
              expect(user).toBeTruthy();
              expect(user.password).not.toBe(newUser.password);
              done();
            })
            .catch(e => done(e));
        });
    });

    it("Should NOT register a user. Required data doesn't exist", done => {
      let newUser = {};

      request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          expect(res.body).toEqual({
            name: "Name is required",
            password: "Password is required",
            password2: "Password confirm is required",
            email: "Email is required"
          });
        })
        .end(done);
    });

    it("should NOT register a user. Required data is invalid", done => {
      let newUser = {
        email: "wrngEmail!.@",
        name: "r",
        password: "wrnPass",
        password2: "wrnPass"
      };

      request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          expect(res.body.email).toBe("Email is invalid");
          expect(res.body.name).toBe(
            "Name must be between 2 and 50 characters"
          );
          expect(res.body.password).toBe(
            "Password must be between 8 and 20 characters"
          );
          expect(res.body.password2).toBe(
            "Password confirm must be between 8 and 20 characters"
          );
        })
        .end(done);
    });

    it("should NOT register a user. Email already exists", done => {
      let newUser = {
        email: users[0].email,
        name: users[0].name,
        password: users[0].password,
        password2: users[0].password
      };

      request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          expect(res.body.email).toBe("Email already exists");
        })
        .end(done);
    });

    it("should NOT register a user. Passwords do not match", done => {
      let newUser = {
        email: users[0].email,
        name: users[0].name,
        password: users[0].password,
        password2: "Anything"
      };

      request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          expect(res.body.password).toBe("Password must match");
          expect(res.body.password2).toBe("Password must match");
        })
        .end(done);
    });
  });

  describe("POST api/users/login", function() {
    it("Should login a user", done => {
      const loginUser = {
        email: users[1].email,
        password: users[1].password
      };

      request(app)
        .post("/api/users/login")
        .send(loginUser)
        .expect(200)
        .expect(res => {
          expect(res.body.success).toBe(true);
          expect(res.body.token).toEqual(expect.stringContaining("Bearer "));
        })
        .end(done);
    });

    it("Should NOT login a user. Not found", done => {
      const loginUser = {
        email: users[1].email + "Something",
        password: users[1].password
      };

      request(app)
        .post("/api/users/login")
        .send(loginUser)
        .expect(400)
        .expect(res => {
          expect(res.body.email).toEqual(
            expect.stringMatching("User not found")
          );
        })
        .end(done);
    });

    it("Should NOT login a user. Wrong password", done => {
      const loginUser = {
        email: users[1].email,
        password: users[1].password + "!!!!"
      };

      request(app)
        .post("/api/users/login")
        .send(loginUser)
        .expect(400)
        .expect(res => {
          expect(res.body.password).toEqual(
            expect.stringMatching("Password is incorrect")
          );
        })
        .end(done);
    });
  });

  describe("GET api/users/current", function() {
    it("Should return current user", done => {
      const payload = {
        id: users[1]._id,
        name: users[1].name,
        avatar: users[1].avatar
      };

      jwt.sign(
        payload,
        process.env.secret,
        { expiresIn: 3600 * 24 },
        (err, token) => {
          if (!err) {
            const currentToken = "Bearer " + token;

            request(app)
              .get("/api/users/current")
              .set("Authorization", currentToken)
              .expect(200)
              .expect(res => {
                expect(res.body._id).toBe(users[1]._id.toHexString());
                expect(res.body.name).toBe(users[1].name);
                expect(res.body.avatar).toBe(users[1].avatar);
              })
              .end(done);
          }
        }
      );
    });

    it("Should NOT return current user", done => {
      request(app)
        .get("/api/users/current")
        .set("Authorization", "949kgm4..9gak..esfn3")
        .expect(401)
        .end(done);
    });
  });
});
