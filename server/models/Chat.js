const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    get: date => date.toLocaleString()
  }
});

const Chat = model('chat', chatSchema);

module.exports = Chat;