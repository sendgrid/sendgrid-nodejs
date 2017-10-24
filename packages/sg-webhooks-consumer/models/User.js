const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const UserSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', UserSchema);
