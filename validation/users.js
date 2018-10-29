const validator = require("validator");
const _ = require("lodash");

const validateFunctions = {
  register: function(data) {
    let errors = {};

    data.name = !_.isEmpty(data.name) ? data.name : "";
    data.email = !_.isEmpty(data.email) ? data.email : "";
    data.password = !_.isEmpty(data.password) ? data.password : "";
    data.password2 = !_.isEmpty(data.password2) ? data.password2 : "";
    data.avatar = !_.isEmpty(data.avatar) ? data.avatar : "";

    if (validator.isEmpty(data.name)) errors.name = "Name is required";
    else {
      if (!validator.isLength(data.name, { min: 2, max: 50 }))
        errors.name = "Name must be between 2 and 50 characters";
    }

    if (validator.isEmpty(data.email)) errors.email = "Email is required";
    else {
      if (!validator.isEmail(data.email)) errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password))
      errors.password = "Password is required";
    else {
      if (!validator.isLength(data.password, { min: 8, max: 20 }))
        errors.password = "Password must be between 8 and 20 characters";
    }

    if (validator.isEmpty(data.password2))
      errors.password2 = "Password confirm is required";
    else {
      if (!validator.isLength(data.password2, { min: 8, max: 20 }))
        errors.password2 =
          "Password confirm must be between 8 and 20 characters";
    }

    if (!validator.equals(data.password, data.password2)) {
      errors.password = "Password must match";
      errors.password2 = errors.password;
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  },
  login: function(data) {
    let errors = {};

    data.email = !_.isEmpty(data.email) ? data.email : "";
    data.password = !_.isEmpty(data.password) ? data.password : "";

    if (validator.isEmpty(data.email)) errors.email = "Email is required";
    else {
      if (!validator.isEmail(data.email)) errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password))
      errors.password = "Password is required";
    else {
      if (!validator.isLength(data.password, { min: 8, max: 20 }))
        errors.password = "Password must be between 8 and 20 characters";
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  }
};

module.exports = validateFunctions;
