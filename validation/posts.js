const validator = require("validator");
const _ = require("lodash");

const validateFunctions = {
  create: function(data) {
    let errors = {};

    data.text = !_.isEmpty(data.text) ? data.text : "";

    if (!validator.isLength(data.text, { min: 10, max: 300 })) {
      errors.text =
        "Публикация должна содержать не менее 10 и не более 300 символов";
    }

    if (validator.isEmpty(data.text)) {
      errors.text = "Текстовое поле обязательное";
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  }
};

module.exports = validateFunctions;
