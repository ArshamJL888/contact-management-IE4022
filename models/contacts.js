const mongoose = require("mongoose");

const contactModel = mongoose.model("contacts", {
  fullName: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
  gender: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  city: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 11,
    maxLength: 11,
  },

  address: {
    type: String,
    required: false,
    maxLength: 250,
  },
  age: {
    type: Number,
    required: false,
    default: 1,
  },
});

module.exports = contactModel;
