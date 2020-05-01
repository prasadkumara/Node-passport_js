const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dob: { 
    type: Date,
    required: true
  },
  date: { 
    type: Date,
    default: Date.now
  },
  status: { 
    type: Boolean,
    required: true
  },
  Isclient: { 
    type: Boolean,
    required: true
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
