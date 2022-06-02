const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: date => date.toLocaleString()
  },
  content: {
    type: String,
    required: true
  }
});

const Message = model('message', messageSchema);

module.exports = Message;
