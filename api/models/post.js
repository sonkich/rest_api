const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   }
});

module.exports = mongoose.model('Product', postSchema);