// validation/madlibs.js
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateMadlibInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  const regexForBlanks = /(?<=\[).[^\]]*/g; // regular expression denoting all substrings contained in brackets (excluding the brackets)
  if (!data.body.match(regexForBlanks)) {
    errors.body = 'Madlib fill-ins are required, use [brackets]!';
  }

  if (!Validator.isLength(data.body, { min: 20 })) {
    errors.body = 'Madlib cant be smaller than 20 characters';
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = 'Madlib body is required';
  }

  if (Validator.isEmpty(data.title)) {
    errors.body = 'Title is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
