const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
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
  },
  {
    toJSON: {
      getters: true,
    },
});

const Message = model('Message', messageSchema);

module.exports = Message;
