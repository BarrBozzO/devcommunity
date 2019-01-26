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

    if (validator.isEmpty(data.name)) errors.name = "Имя обязательное поле";
    else {
      if (!validator.isLength(data.name, { min: 2, max: 50 }))
        errors.name = "Имя должно быть не менее 2 и не более 50 символов";
    }

    if (validator.isEmpty(data.email)) errors.email = "Email обязательное поле";
    else {
      if (!validator.isEmail(data.email)) errors.email = "Email некоректный";
    }

    if (validator.isEmpty(data.password))
      errors.password = "Пароль обязательное поле";
    else {
      if (!validator.isLength(data.password, { min: 8, max: 20 }))
        errors.password =
          "Пароль должен быть не менее 8 и не более 20 символов";
    }

    if (validator.isEmpty(data.password2))
      errors.password2 = "Пароль для подтверждения обязательное поле";
    else {
      if (!validator.isLength(data.password2, { min: 8, max: 20 }))
        errors.password2 =
          "Пароль для подтверждения должен быть не менее 8 и не более 20 символов";
    }

    if (!validator.equals(data.password, data.password2)) {
      errors.password = "Пароли должны совпадать";
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

    if (validator.isEmpty(data.email)) errors.email = "Email некорректный";
    else {
      if (!validator.isEmail(data.email)) errors.email = "Email некорректный";
    }

    if (validator.isEmpty(data.password))
      errors.password = "Пароль обязательное поле";
    else {
      if (!validator.isLength(data.password, { min: 8, max: 20 }))
        errors.password =
          "Пароль должен быть не менее 8 и не более 20 символов";
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  }
};

module.exports = validateFunctions;
