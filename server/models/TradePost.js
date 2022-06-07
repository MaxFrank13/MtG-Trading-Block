const { Schema, model } = require('mongoose');

const tradePostSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      getters: true,
    },
});

const TradePost = model('TradePost', tradePostSchema);

module.exports = TradePost;