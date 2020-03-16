const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    row: Object,
    table: String,
    user: String,
    method: String,
    CreatedAt: { type: Date, default: Date.now} 
  }

);

module.exports = mongoose.model('dblogs', logSchema);