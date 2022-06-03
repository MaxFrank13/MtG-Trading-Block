const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: String,
    get: date => date.toLocaleString()
  },
  content: {
    type: String,
    required: true
  },
  chat_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const Message = model('Message', messageSchema);

module.exports = Message;
