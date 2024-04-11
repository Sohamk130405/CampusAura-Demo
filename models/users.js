const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const emailRegex = /^[a-zA-Z0-9._-]+@vit\.edu$/;
const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit phone number

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  name: String,
  email: {
    type: String,
    validate: {
      validator: (value) => emailRegex.test(value),
      message: 'Invalid email format. Only college emails are allowed.',
    },
  },
  password: String,
  idCard: {
    type: String,
  },
  contact: {
    type: Number,
    validate: {
      validator: (value) => phoneRegex.test(value.toString()),
      message: 'Invalid phone number format. Please enter a 10-digit number.',
    },
  },
  status: {
    type: String,
    default: 'Not Verified',
  },
  linkedAccounts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  branch: String,
  year: String,
  type: String,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
