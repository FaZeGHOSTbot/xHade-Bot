const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    GuildOwnerID: String,
    GuildOwnerName: String,  
    prefix: String,
})

module.exports = mongoose.model('Guild', guildSchema);