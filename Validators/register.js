const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  fullName: {
    type: "string",
    min: 6,
    max: 50,
  },

  username: {
    type: "string",
    min: 5,
    max: 15,
  },

  email: {
    type: "string",
    min: 10,
    max: 50,
  },

  gender: {
    type: "string",
    min: 3,
    max: 20,
  },

  city: {
    type: "string",
    min: 3,
    max: 40,
  },

  phoneNumber: {
    type: "string",
    min: 11,
    max: 11,
  },

  address: {
    type: "string",
    max: 250,
  },

  age: {
    type: "number",
    default: 1,
  },

  $$strict: true, // no additional properties allowed
};

const check = v.compile(schema);

module.exports = check;
