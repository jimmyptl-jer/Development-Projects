const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number }
    }]
  }
})

module.exports = mongoose.model('User', UserSchema)