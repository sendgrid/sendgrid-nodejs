const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const RecipientSchema = require('./Recipient');

const SurveySchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  heading: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  dateSent: Date,
  lastResponded: Date
});

module.exports = mongoose.model('Survey', SurveySchema);
