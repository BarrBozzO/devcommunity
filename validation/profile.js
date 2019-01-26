const validator = require("validator");
const _ = require("lodash");

const validateFunctions = {
  createOrUpdate: function(data) {
    let errors = {};

    data.handle = !_.isEmpty(data.handle) ? data.handle : "";
    data.status = !_.isEmpty(data.status) ? data.status : "";
    data.skills = !_.isEmpty(data.skills) ? data.skills : "";

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = "Указатель должен быть не менее 2 и не более 40 символов";
    }

    if (validator.isEmpty(data.handle)) {
      errors.handle = "Указатель обязателеное поле";
    }

    if (validator.isEmpty(data.status)) {
      errors.status = "Статус обязателеное поле";
    }

    if (validator.isEmpty(data.skills)) {
      errors.skills = "Навыки обязательное поле";
    }

    if (!_.isEmpty(data.website)) {
      if (!validator.isURL(data.website)) {
        errors.website = "Некорректный URL";
      }
    }

    if (!_.isEmpty(data.youtube)) {
      if (!validator.isURL(data.youtube)) {
        errors.youtube = "Некорректный URL";
      }
    }

    if (!_.isEmpty(data.twitter)) {
      if (!validator.isURL(data.twitter)) {
        errors.twitter = "Некорректный URL";
      }
    }

    if (!_.isEmpty(data.facebook)) {
      if (!validator.isURL(data.facebook)) {
        errors.facebook = "Некорректный URL";
      }
    }

    if (!_.isEmpty(data.linkedin)) {
      if (!validator.isURL(data.linkedin)) {
        errors.linkedin = "Некорректный URL";
      }
    }

    if (!_.isEmpty(data.instagram)) {
      if (!validator.isURL(data.instagram)) {
        errors.instagram = "Некорректный URL";
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
      errors.title = "Должность обязательное поле";
    }

    if (validator.isEmpty(data.company)) {
      errors.company = "Компания обязательное поле";
    }

    if (validator.isEmpty(data.from)) {
      errors.from = "Дата начала обязательное поле";
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
      errors.school = "Учебное заведение обязательное поле";
    }

    if (validator.isEmpty(data.degree)) {
      errors.degree = "Степень обязательное поле";
    }

    if (validator.isEmpty(data.fieldofstudy)) {
      errors.fieldofstudy = "Область знания обязательное поле";
    }

    if (validator.isEmpty(data.from)) {
      errors.from = "Дата окончания обязательное поле";
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  }
};

module.exports = validateFunctions;
