const validator = require("validator");
const _ = require("lodash");

const validateFunctions = {
  createOrUpdate: function(data) {
    let errors = {};

    data.handle = !_.isEmpty(data.handle) ? data.handle : "";
    data.status = !_.isEmpty(data.status) ? data.status : "";
    data.skills = !_.isEmpty(data.skills) ? data.skills : "";

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = "Handle needs to between 2 and 4 characters";
    }

    if (validator.isEmpty(data.handle)) {
      errors.handle = "Profile handle is required";
    }

    if (validator.isEmpty(data.status)) {
      errors.status = "Status field is required";
    }

    if (validator.isEmpty(data.skills)) {
      errors.skills = "Skills field is required";
    }

    if (!_.isEmpty(data.website)) {
      if (!validator.isURL(data.website)) {
        errors.website = "Not a valid URL";
      }
    }

    if (!_.isEmpty(data.youtube)) {
      if (!validator.isURL(data.youtube)) {
        errors.youtube = "Not a valid URL";
      }
    }

    if (!_.isEmpty(data.twitter)) {
      if (!validator.isURL(data.twitter)) {
        errors.twitter = "Not a valid URL";
      }
    }

    if (!_.isEmpty(data.facebook)) {
      if (!validator.isURL(data.facebook)) {
        errors.facebook = "Not a valid URL";
      }
    }

    if (!_.isEmpty(data.linkedin)) {
      if (!validator.isURL(data.linkedin)) {
        errors.linkedin = "Not a valid URL";
      }
    }

    if (!_.isEmpty(data.instagram)) {
      if (!validator.isURL(data.instagram)) {
        errors.instagram = "Not a valid URL";
      }
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  },
  experience: function(data) {
    let errors = {};

    data.title = !_.isEmpty(data.title) ? data.title : "";
    data.company = !_.isEmpty(data.company) ? data.company : "";
    data.from = !_.isEmpty(data.from) ? data.from : "";

    if (validator.isEmpty(data.title)) {
      errors.title = "Job title field is required";
    }

    if (validator.isEmpty(data.company)) {
      errors.company = "Company field is required";
    }

    if (validator.isEmpty(data.from)) {
      errors.from = "From date field is required";
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  },
  education: function(data) {
    let errors = {};

    data.school = !_.isEmpty(data.school) ? data.school : "";
    data.degree = !_.isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !_.isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.from = !_.isEmpty(data.from) ? data.from : "";

    if (validator.isEmpty(data.school)) {
      errors.school = "School field is required";
    }

    if (validator.isEmpty(data.degree)) {
      errors.degree = "Degree field is required";
    }

    if (validator.isEmpty(data.fieldofstudy)) {
      errors.fieldofstudy = "Field of study field is required";
    }

    if (validator.isEmpty(data.from)) {
      errors.from = "From date field is required";
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  }
};

module.exports = validateFunctions;
