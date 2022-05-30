const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  scryfall_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageNormal: {
    type: String,
    required: true
  },
  imageSmall: {
    type: String,
    required: true
  }
});

const Card = model('Card', cardSchema);

module.exports = Card;
