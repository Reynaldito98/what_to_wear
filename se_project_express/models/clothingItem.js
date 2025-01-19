const mongoose = require('mongoose');
const validator = require('validator');

const clothingItemSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
  },
  weather: {
      type: String,
      required: true,
      enum: ['hot', 'cold', 'warm'],
  },
  imageUrl: {
      type: String,
      required: true,
      validate: {
        validator:  (v) => validator.isURL(v),
        message: 'You must enter a valid URL',
    }
  },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
  },
  likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  }],
  createdAt: {
      type: mongoose.Schema.Types.Date,
  }
})

module.exports = mongoose.model('clothingItem', clothingItemSchema);