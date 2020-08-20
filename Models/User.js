const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    isRequired: true,
  },
  imageUrl: {
    type: String,
    isRequired: true
  },
  gameId: {
    type: Number,
    isRequired: true
  }
})

//virtual to streams? 

module.exports = mongoose.model('Game', schema);