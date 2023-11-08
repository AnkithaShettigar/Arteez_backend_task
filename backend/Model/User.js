const mongoose = require('mongoose');

const newShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const collection = mongoose.model('RegisteredUser', newShema);
module.exports = collection;
