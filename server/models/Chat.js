const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
  {
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
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

chatSchema.virtual('userCount').get(function() {
  return this.users.length;
});

chatSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;