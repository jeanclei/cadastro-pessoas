const mongoose = require('mongoose');

const docSchema = new mongoose.Schema(
  {
    base64: !String,
    CreatedAt: { type: Date, default: Date.now}
  }

);

module.exports = mongoose.model('base64docs', docSchema);