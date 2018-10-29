const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load Models
const { User } = require("../../models/User");
const { Profile } = require("../../models/Profile");
// Validation
const validate = require("../../validation").profile;

/**
 * @path GET api/profile
 * @desc Return user's profile
 * @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["avatar", "name"])
      .then(profile => {
        if (!profile) {
          errors.msg = "No profile for this user";
          return res.status(404).json(errors);
        }

        res.status(200).json(profile);
      })
      .catch(e => res.status(404).json(err));
  }
);

/**
 * @path GET api/profile/all
 * @desc Get all profiles
 * @access Public
 */
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["avatar", "name"])
    .then(profiles => {
      if (!profiles) {
        return res.status(404).json({ noprofile: "There are no profiles" });
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ noprofile: "There are no profiles" }));
});

/**
 * @path GET api/profile/user/:user_id
 * @desc Get all profiles
 * @access Public
 */
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["avatar", "name"])
    .then(profile => {
      if (!profile) {
        return res
          .status(404)
          .json({ noprofile: "There are no profile for this user id" });
      }

      res.json(profile);
    })
    .catch(err =>
      res
        .status(404)
        .json({ noprofile: "There are no profile for this user id" })
    );
});

/**
 * @path GET api/profile/handle/:handle
 * @desc Get all profiles
 * @access Public
 */
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["avatar", "name"])
    .then(profile => {
      if (!profile) {
        return res
          .status(404)
          .json({ noprofile: "There are no profile for this handle" });
      }

      res.json(profile);
    })
    .catch(err =>
      res
        .status(404)
        .json({ noprofile: "There are no profile for this handle" })
    );
});

/**
 * @path POST api/profile
 * @desc Create or Update user's profile
 * @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validate.createOrUpdate(req.body);

    if (!isValid) {
      res.status(400).json(errors);
      return;
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

/**
 * @path POST api/profile/experience
 * @desc Update user's experience
 * @access Private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validate.experience(req.body);

    if (!isValid) {
      res.status(400).json(errors);
      return;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validate.education(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

/**
 * @path DELETE api/profile/experience
 * @desc Remove user's experience
 * @access Private
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const expRemoveIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        profile.experience.splice(expRemoveIndex, 1);

        profile.save().then(savedProfile => res.json(savedProfile));
      })
      .catch(e => res.status(400).json(e));
  }
);

/**
 * @path DELETE api/profile/education
 * @desc Remove user's education
 * @access Private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @path DELETE api/profile
 * @desc Remove user and it's profile
 * @access Private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
