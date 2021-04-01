const mongoose = require('mongoose');
const Guild = require('../models/guild');
const Prefix = 'x!' 

module.exports = async (client, guild) => {
        let newGuild = new Guild({
            guildID: guild.id,
            guildName: guild.name,
            GuildOwnerID: guild.ownerID,
            GuildOwnerName: guild.owner.user.tag,
            prefix: Prefix,
        });
    newGuild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('I have joined a new server!')
};