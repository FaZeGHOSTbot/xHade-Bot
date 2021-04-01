const mongoose = require('mongoose');
const ProfileModel = require('../models/profileSchema')


module.exports = async(client, discord, member) => {
    let profile = new ProfileModel({
        userID: member.id,
        coins: 1000,
        bank: 0
    });
profile.save()
.then(result => console.log(result))
    .catch(err => console.error(err));
console.log("New member profile created")
};