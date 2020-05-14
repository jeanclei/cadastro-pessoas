const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    id: Number,
    atribs: Object,
    table: String,
    user: String,
    method: String,
    CreatedAt: { type: Date, default: Date.now} 
  }

);

module.exports = mongoose.model('dblogs', logSchema);