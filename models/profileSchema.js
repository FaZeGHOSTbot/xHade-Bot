const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userName: {type: String, require: true},
    userID: {type: String, require: true, unique: true },
    coins: {type: Number, default: 1000},
    bank: {type: Number}
});

module.exports = mongoose.model('ProfileModels', profileSchema);
