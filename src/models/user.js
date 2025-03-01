const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: { type: String, required: true },
  guildId: { type: String, required: true },
  balance: { type: Number, default: 0 },
  lastDaily: { type: Date, default: new Date(0) }, // Default to epoch
});

module.exports = model('User', userSchema);
