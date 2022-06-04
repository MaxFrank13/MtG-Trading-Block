const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  cardId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageSmall: {
    type: String
  },
  imageNormal: {
    type: String
  },
  price: {
    type: Number
  }
});

const Card = model('Card', cardSchema);

module.exports = Card;
