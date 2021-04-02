const Discord = require('discord.js');

const {Client, Collection, Attachment, MessageEmbed} = require('discord.js');
const client = new Client({ partials: ['MESSSAGE']});
const ms = require("ms");
const fs = require("fs");
let db = require('quick.db')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Lucifer:cenalm10@xhade.mtjd5.mongodb.net/Data',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


client.events = new Collection();
client.commands = new Collection();
client.mongoose = require('./utils/mongoose');
const profileModel = require("./models/profileSchema");

const PREFIX = "x!"
const token = 'ODI2ODMzMzc1MjI1NDQ2NDQw.YGSOlg.x4DENqRn2gfyFEh7zJbuDGuLnek';
const Jimp = require(`jimp`)
const superagent = require('superagent');
const moment = require("moment")
require("moment-duration-format")
const urban = require('urban.js')
const malScraper = require('mal-scraper');
const rp = require('request-promise-native');
const randomPuppy = require("random-puppy");
const booru = require('booru');
const express = require("express");
const { profile } = require('console');
const timeoutBeg = 3600000;
const timeoutWork = 3600000;
const timeoutDaily = 86400000;
const timeoutWeekly = 604800016;
const timeoutMonthly = 2629800000;
const timeoutPlay = 3600000;

var fortunes = [
   "`Yes`",
   "`No`",
   "`Maybe`",
   "`Ask again`",
   "`Sometimes`",
   "`Okay`",
   "`HELL NO`",
   "`FUCK YEAH`",
   "`no no no`"
 ];

client.on('ready',() =>{
    console.log("Started up! Lets go bois!")
 const startUp = new Discord.MessageEmbed()
    .setTitle("Bot Status")
    .setDescription("*``Bot Started UP!``*")
    .setColor(0x36FF00)
    .setTimestamp()
    .setFooter("xHade's Bot") 
    try{
   client.channels.cache.get('826836352711917588').send(startUp)
   client.user.setStatus('online')
     client.user.setActivity('with Life',{
             type: "PLAYING"})
     }catch(error){console.log("Bot is Not in the server")}
 })

 client.on('message' ,async message=>{

   let profileData;
       try{
         profileData = await profileModel.findOne({ userID: message.author.id});
         if(!profileData){
            let profile = await profileModel.create({
               userName: message.author.username,
               userID: message.author.id,
               coins: 1000,
               bank: 0,
            });
            profile.save();
         }
       }catch(err){
          console.log(err)
       }

   if(message.author.bot || message.channel.type === 'dm') return;
   if (message.mentions.has(client.user)){
      if(message.author.bot || message.channel.type === 'dm') return;
        message.channel.send(`My PREFIX for the server is \`${PREFIX}\``)
     }
     let args = message.content.substring(PREFIX.length).split(" ");
      

    if(message.content.substring(0, PREFIX.length) == PREFIX){
        let argss = args[0].toLowerCase() 

        switch(argss)
        {
          /*case "help":

        try {
            message.reply("Please check your direct messages :inbox_tray:");

            message.react('✅');

            message.author.send({embed: {
            color: 3447003,
            title: "Bot's commands",
            fields: [{
                name: "⚙️ Moderation",
                value: 'ban , kick , softban , unban, mute, unmute'
              },
              {
                name: "🎉 Fun",
                value: 'meme, rps, ratewaifu, 8ball, advice, anime, dick, roll, urban, animesearch, notice, coinflip, quote, baka, dog'
              },
              {
                name: "🎞 Gif",
                value: "pat, punch, stare, highfive, smile, handhold, kill, hug, cry, kiss, tickle, spank, poke"
              },
              {
                name: " 🛠 Admin",
                value: "announce, botnick, uptime, dm, purge"
              },
              {
                name: "📊 Server",
                value: "announce, avatar, server-suggest/ssugest, bot-suggest/bsuggest, poll, invite, calc/calculator, ping, issue, serverinfo, info, createticket, closeticket"
              },
              {
               name: "🎊 Giveaway",
               value: "giveaway-start, giveaway-reroll, giveaway-end"

             }
           ],
           timestamp: new Date(),
           footer: {
             icon_url: client.user.avatarURL,
             text: client.user.username
           }
         }
       });
       }
       catch(err) {
           message.channel.send('I could not send you my commands!');
       } 
       break;*/
     
       
       case 'purge':
          console.log('help')
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You need 'Manage Messages' permission to use this command!")
    
    var temp = parseInt(args[1]) || 0;
    
      
			if(temp < 1 || temp > 99)
				message.channel.send('Please select a number from 1-99');
			else {
         
				message.channel.messages.fetch({limit: (temp+1)}).then(messages => {
				    const unpinnedMessages = messages.filter(message => !(message.pinned)); 
				    message.channel.bulkDelete(unpinnedMessages, true);
				    msgsDeleted = unpinnedMessages.array().length; 
            client.flag = true;
					msg.channel.send(msgsDeleted-1 + ' message(s) deleted!');
					
				}).catch(err => {
					
          message.delete();
				});
			}

              break;

   case 'meme':
  const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const Memeimg = await randomPuppy(random);
        const Memeembed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(Memeimg)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter(client.user.username)
            .setTimestamp()

        message.channel.send(Memeembed);
  break;

  case 'rps':
    if(message.guild === null)return;
  
  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
  
var msg1 = Array(3);
		msg1[1] = "Rock :black_circle:";
	    msg1[2] = "Paper :page_facing_up:";
		msg1[3] = "Scissors :scissors:"
        var x = getRandomInt(0, 9);
		if (x < 6){
         if (x < 3){
            const rockrps = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("RANDOM")
            .setTitle(`Result is:`)
            .setDescription(`Rock :black_circle:`)
            .setFooter(client.user.username)
            .setTimestamp()
			message.channel.send(rockrps);
		}
		else{
         const paperrps = new Discord.MessageEmbed()
         .setAuthor(message.author.username, message.author.avatarURL())
         .setColor("RANDOM")
         .setTitle(`Result is:`)
         .setDescription(`Paper :page_facing_up:`)
         .setFooter(client.user.username)
         .setTimestamp()
      message.channel.send(paperrps);
		}
		}
		else{ 
			const scissorrps = new Discord.MessageEmbed()
         .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("RANDOM")
            .setTitle(`Result is:`)
            .setDescription(`Scissors :scissors:`)
            .setFooter(client.user.username)
            .setTimestamp()
			message.channel.send(scissorrps);
}
 break;

 case 'daily':
   const cooldownDaily = await db.fetch(`Daily_${message.guild.id}_${message.author.id}`); 
   if (cooldownDaily !== null && timeoutDaily - (Date.now() - cooldownDaily) > 0) {
		const timeDaily = ms(timeoutDaily - (Date.now() - cooldownDaily));
      let DailyCD = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setTitle('Daily Command Cooldown 🕒')
      .setDescription(`You can use the command again in **${timeDaily}**! `)
      .setColor(0xFF0000)  
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
		message.channel.send(DailyCD);
	} else {
   let Daily = await profileModel.findOneAndUpdate({
      userID: message.author.id
  }, 
  {
     $inc: {
        coins: 1000,
     },
  }
  );
  const DailyEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`You got your daily \n**1000 VP**`)
  .setColor('RANDOM')  
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(DailyEmbed);

  db.set(`Daily_${message.guild.id}_${message.author.id}`, Date.now());
}
 break;

 case 'play':
  const cooldownPlay = await db.fetch(`Play_${message.guild.id}_${message.author.id}`); 
  if (cooldownPlay !== null && timeoutPlay - (Date.now() - cooldownPlay) > 0) {
   const timePlay = ms(timeoutPlay - (Date.now() - cooldownPlay));
     let PlayCD = new Discord.MessageEmbed()
     .setAuthor(message.author.username, message.author.avatarURL())
     .setTitle('Play Command Cooldown 🕒')
     .setDescription(`Take some rest! You can play Valorant again in **${timePlay}**! `)
     .setColor(0xFF0000)  
     .setFooter(client.user.username, client.user.displayAvatarURL())
     .setTimestamp()
   message.channel.send(PlayCD);
 } else {
  const randomNumberPlay = Math.floor(Math.random()*1000) + 1;
  let Daily = await profileModel.findOneAndUpdate({
     userID: message.author.id
 }, 
 {
    $inc: {
       coins: randomNumberPlay,
    },
 }
 );
 const PlayEmbed = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.avatarURL())
 .setDescription(`You Played Valorant for an hour and won: \n**${randomNumberPlay} VP**`)
 .setColor('RANDOM')  
 .setFooter(client.user.username, client.user.displayAvatarURL())
 .setTimestamp()
 message.channel.send(PlayEmbed);

 db.set(`Play_${message.guild.id}_${message.author.id}`, Date.now());
}
 
 
 break;

 case 'bet':
   case 'gamble':

   if(!args[1]) {
    let BetFail = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(`You have to specify an amount to bet.`)
    .setColor(0xFF0000)  
    .setFooter('You have a 1/500 chance to win **3x VP**', client.user.displayAvatarURL())
    .setTimestamp()
    return message.channel.send(BetFail);
  
   }else if((args[1])) {
    const betAmount = args[1]
    if(Number.isNaN(+betAmount)){
      let BetFail = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`**${args[1]}** is an incorrect bet amount.`)
      .setColor(0xFF0000)  
      .setFooter('You have a 1/500 chance to win **3x VP**', client.user.displayAvatarURL())
      return message.channel.send(BetFail)

    }else{
   
   let bet = profileModel.findOne({
    userID: message.author.id
 }, (err, bet) => {
    if(err) console.log(err);
    if (bet.coins < betAmount){
      let BetFail = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(`You do not have **${betAmount} VP** to bet.`)
    .setColor(0xFF0000)  
    .setFooter('You have a 1/500 chance to win **3x VP**', client.user.displayAvatarURL())
    .setTimestamp()
    return message.channel.send(BetFail)
    } else{
      const randomNumberBet = Math.floor(Math.random()*500) + 1;
      if(randomNumberBet <= 250){
      let gamble = profileModel.findOneAndUpdate({
        userID: message.author.id
    }, 
    {
       $inc: {
          coins: -betAmount,
       },
    }
    );
    let BetEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL())
  .setTitle(`Bad Day :(`)
  .setDescription(`Your luck ran out and you lost: \n**${betAmount} VP**`)
  .setColor(0xFF0000)  
  .setFooter(`You have a 1/500th chance to win 3x VP`, client.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(BetEmbed);
  }else if(randomNumberBet > 250 && randomNumberBet < 500){
    let gamble = profileModel.findOneAndUpdate({
      userID: message.author.id
  }, 
  {
     $inc: {
        coins: betAmount,
     },
  }
  );
  let BetEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL())
  .setTitle(`Success! :)`)
  .setDescription(`Luck was on you and you won **2x VP**: \n**${betAmount*2} VP**`)
  .setColor(0x5CFF5C)  
  .setFooter(`You have a 1/500th chance to win 3x VP`, client.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(BetEmbed);
  } else if(randomNumberBet === 500){
    let gamble = profileModel.findOneAndUpdate({
      userID: message.author.id
  }, 
  {
     $inc: {
        coins: betAmount*2,
     },
  }
  );
  let BetEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL())
  .setTitle(`CONGRATS! :O :)`)
  .setDescription(`Damn! You pulled off a major heist in history and won **3x VP**: \n**${betAmount*3} VP**`)
  .setColor(0xFFD700)  
  .setFooter('You are out **1/500th** winner!', client.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(BetEmbed);
  }
    }
 }
   );
   
}}
   break;

 case 'work':
   const cooldownWork = await db.fetch(`Work_${message.guild.id}_${message.author.id}`); 
   if (cooldownWork !== null && timeoutWork - (Date.now() - cooldownWork) > 0) {
		const timeWork = ms(timeoutWork - (Date.now() - cooldownWork));
      let WorkCD = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setTitle('Work Command Cooldown 🕒')
      .setDescription(`You can use the command again in **${timeWork}**! `)
      .setColor(0xFF0000)  
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
		message.channel.send(WorkCD);
	} else {
      const randomNumberWork = Math.floor(Math.random()*700) + 1;
    let Work = await profileModel.findOneAndUpdate({
      userID: message.author.id
  }, 
  {
     $inc: {
        coins: randomNumberWork,
     },
  }
  );
  const WorkEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`You have Worked for Valorant got \n**${randomNumberWork} VP**`)
  .setColor('RANDOM')  
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(WorkEmbed);

  db.set(`Work_${message.guild.id}_${message.author.id}`, Date.now());
}
 break; 


 case 'monthly':
  const cooldownMonthly = await db.fetch(`Monthly_${message.guild.id}_${message.author.id}`); 
  if (cooldownMonthly !== null && timeoutMonthly - (Date.now() - cooldownMonthly) > 0) {
   const timeMonthly = ms(timeoutMonthly - (Date.now() - cooldownMonthly));
   let MonthlyCD = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.avatarURL())
   .setTitle('Monthly Command Cooldown 🕒')
   .setDescription(`You can use the command again in **${timeMonthly}**! `)
   .setColor(0xFF0000)  
   .setFooter(client.user.username, client.user.displayAvatarURL())
   .setTimestamp()
 message.channel.send(MonthlyCD);
  }else {
    let Weekly = await profileModel.findOneAndUpdate({
      userID: message.author.id
  },
  {
    $inc: {
      coins: 30000,
  },
}
    );
    const MonthlyEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(`You worked as a RIOT dev for a month and got \n**30,000 VP**`)
    .setColor('RANDOM')  
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(MonthlyEmbed);
  
    db.set(`Monthly_${message.guild.id}_${message.author.id}`, Date.now());
  }
 break;


 case 'weekly':
  const cooldownWeekly = await db.fetch(`Weekly_${message.guild.id}_${message.author.id}`); 
  if (cooldownWeekly !== null && timeoutWeekly - (Date.now() - cooldownWeekly) > 0) {
   const timeWeekly = ms(timeoutWeekly - (Date.now() - cooldownWeekly));
   let WeeklyCD = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.avatarURL())
   .setTitle('Weekly Command Cooldown 🕒')
   .setDescription(`You can use the command again in **${timeWeekly}**! `)
   .setColor(0xFF0000)  
   .setFooter(client.user.username, client.user.displayAvatarURL())
   .setTimestamp()
 message.channel.send(WeeklyCD);
  }else {
    let Weekly = await profileModel.findOneAndUpdate({
      userID: message.author.id
  },
  {
    $inc: {
      coins: 5000,
  },
}
    );
    const WeeklyEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(`You have worked hard for a week in RIOT and got \n**5,000 VP**`)
    .setColor('RANDOM')  
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(WeeklyEmbed);
  
    db.set(`Weekly_${message.guild.id}_${message.author.id}`, Date.now());
  }

 break;

 case 'beg':
   const cooldownBeg = await db.fetch(`Beg_${message.guild.id}_${message.author.id}`); 
   if (cooldownBeg !== null && timeoutBeg - (Date.now() - cooldownBeg) > 0) {
		const timeBeg = ms(timeoutBeg - (Date.now() - cooldownBeg));
      let BegCD = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setTitle('Beg Command Cooldown 🕒')
      .setDescription(`You can use the command again in **${timeBeg}**! `)
      .setColor(0xFF0000)  
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
		message.channel.send(BegCD);
	} else {
    const randomNumberbeg = Math.floor(Math.random()*200) + 1;
    let beg = await profileModel.findOneAndUpdate({
      userID: message.author.id
  }, 
  {
     $inc: {
        coins: randomNumberbeg,
     },
  }
  );
  const begEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`You have begged for Valorant Skins and got \n**${randomNumberbeg} VP**`)
  .setColor('RANDOM')  
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setTimestamp()
  message.channel.send(begEmbed);

  db.set(`Beg_${message.guild.id}_${message.author.id}`, Date.now());
}
    break;

/*case 'give':

if(!args[1])return message.channel.send('Please specify a user.');
if (!args[2]) return message.channel.send('Please specify the amount of money you want to send.');
if (isNaN(args[2])) return message.channel.send('That is not a valid amount.');
const amount = Math.floor(args[2]);

const give = profileModel.findOne({
   userID = message.author.id
}, (err, give) => {
   if(err) console.log(err);
   if(give.coins >= args[2]){
      return message.channel.send(`You do not have that much VP with you! You have **${give.coins} VP**`)
   }
   if(give.coins > args[2]) return message.channel.send(`You are trying to send more **VP** than you have! You have **${give.coins} VP**`)
  
   if (isNaN(args[1])) {
    const giveUser = message.mentions.users.first();
    if (!giveUser) return message.channel.send('That is not a valid user.');
const target = await profileModel.findOne({ userID: giveUser.id});
            if (!target) return message.channel.send('User is not in available.');

            await profileModel.findOneAndUpdate({
               userID: message.author.id
           }, {
               $inc: {
                   coins: -amount
               }
           });
           await profileModel.findOneAndUpdate({
               userID: member.id
           }, {
               $inc: {
                   coins: amount
               }
           });
           message.channel.send(`You have successfuly given **${amount} VP** to <@${giveUser.id}>.`);
   } else {
      if (isNaN(args[1])) return message.channel.send('That is not a valid user ID.');
      const target1 = await profileModel.findOne({ userID: args[1]});
            if (!target1) return message.channel.send('That user is not in the DataBase.');

            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    coins: -amount
                }
            });
            await profileModel.findOneAndUpdate({
                userID: args[1]
            }, {
                $inc: {
                    coins: amount
                }
            });
            message.chanenl.send(`You have successfully given **${amount} VP** to <@${args[1]}>.`);
   }
})


break;*/

case 'poke':
                  const pokeuser = message.mentions.users.first();
          if(!pokeuser)
              return message.reply('Mention someone to poke!');

          superagent.get('https://nekos.life/api/v2/img/poke')
              .end((err, response) => {
            const pokeEmbed = new Discord.MessageEmbed()
            .setTitle(pokeuser.username + " just got poked by " + message.author.username)
            .setImage(response.body.url)
            .setColor(`RANDOM`)
            .setDescription((pokeuser.toString() + " got poked by " + message.author.toString()))
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setURL(response.body.url);
        message.channel.send(pokeEmbed);
          })
          break;

case 'say':
  if(message.member.hasPermission("ADMINISTRATOR", explicit = true)){
    
    if(!args[1]) return message.channel.send("You need to say something")
    message.delete()
    let msgARGS = args.slice(1).join(" "); 
    message.channel.send(msgARGS)
  }
  break;

case 'bal':
   case 'balance':
      if(!args[1]){
    let bal = profileModel.findOne({
         userID: message.author.id
     }, (err, bal) => {
     if(err) console.log(err);
     if (bal){
         let balance = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle(`${message.author.username}'s Balance`)
            .setColor(0x28AFD6)  
            .setThumbnail('https://valorant-coins.com/wp-content/uploads/2020/10/pq2si1uks8t41-300x374.png')
            .addField(`**Balance VP: **`,`${bal.coins}`)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
          message.channel.send(balance);
     }else return message.channel.send("User not found!")
      })
      }else if (message.mentions.users.first()){
         let mentionID = message.mentions.users.first().id
         let mention = message.mentions.users.first()
         let mbal = profileModel.findOne({
            userID: mentionID
         },(err, mbal) => {
            if(err) console.log(err);
        if(mbal){
         let mbalance = new Discord.MessageEmbed()
         .setAuthor(message.author.username, message.author.avatarURL())
         .setTitle(`${mention.username}'s Balance`)
         .setColor(0x28AFD6)  
         .setThumbnail('https://valorant-coins.com/wp-content/uploads/2020/10/pq2si1uks8t41-300x374.png')
         .addField(`**Balance VP: **`,`${mbal.coins}`)
         .setFooter(client.user.username, client.user.displayAvatarURL())
         .setTimestamp()
       message.channel.send(mbalance);
  }else return message.channel.send("User not found!")
         })
      }else return message.channel.send("wrong syntax")
   break;

 case 'avatar':
              case 'av':
              if(!message.mentions.users.first()){
               const avSelf = new Discord.MessageEmbed()
               .setAuthor(message.author.username, message.author.avatarURL())
               .setTitle('Avatar:')
               .setColor(0xFEFB2D)
               .setFooter(client.user.username)
               .setTimestamp()
               .setImage(message.author.avatarURL({size: 2048, format: "png", dynamic: true}))
               message.channel.send(avSelf) 

              }else if (message.mentions.users.first()){
                 let avMention = message.mentions.users.first();
               const avOther = new Discord.MessageEmbed()
               .setAuthor(avMention.username, avMention.avatarURL())
               .setColor(0xFEFB2D)
               .setTitle('Avatar:')
               .setFooter(client.user.username)
               .setTimestamp()
               .setImage(avMention.avatarURL({size: 2048, format: "png", dynamic: true}))
               message.channel.send(avOther) 
              
              }
              break;

              case 'dm':
                        let mention1 = message.mentions.users.first();
                        if((message.member.roles.cache.find(r => r.id === 826872322450653255)) || (message.author.id == '424568410765262848')) {
                        if (!mention1){
                          message.channel.send("Mention an user to DM.")
                         break;
                        }
                        if(!args[2]){
                        message.channel.send("Type a message to send.")
                        break;
                          }
                        let msgArgs3 = args.slice(2).join(" "); 
                        mention1.send(msgArgs3) 
                        message.channel.send("Message sent to user!✅")
                        }
                        else return message.channel.send("You are not allowed to use this command.")
                        break;    
                        
                        case 'poll':
                          if(message.member.hasPermission("ADMINISTRATOR", explicit = true)){
                            const pol = new Discord.MessageEmbed()
                            .setAuthor(message.author.username, message.author.avatarURL())
                              .setColor(0xFFC300)
                              .setTitle("Poll Creation")
                              .setDescription(`${PREFIX}poll <poll topic>`)
                              .setTimestamp()
                              .setFooter(client.user.username)
                            if(!args[1]){
                               message.channel.send(pol)
                              
                            }  else if(args[1]){
                                message.delete();
                            let msgArgs = args.slice(1).join(" ");
                              const poll = new Discord.MessageEmbed()
                              .setAuthor(message.guild.name, message.guild.iconURL())
                                 .setTitle('📊Server Poll')
                                 .setDescription(`📌**${msgArgs}**`)
                                 .setFooter(`Poll By: ${message.author.tag} | ID: ${message.author.id}`,message.author.avatarURL())
                                 .setTimestamp()
                                 .setColor(0xFFC300);
                                 message.channel.send(poll).then(messageReaction =>{
                                    messageReaction.react('👍');
                                    messageReaction.react('👎');
                                 })
                                 }  
                               }else return message.channel.send("You need ADMIN perms to use this command!") 
                              break;  

       case 'announce':
               if(message.member.hasPermission("ADMINISTRATOR", explicit = true)){
                const announceH = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor(0xFF0087)
                .setTitle('**Server Announcement**')
                .setDescription(`${PREFIX}announce <announcement>`)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
              if(!args[1]){
                 message.channel.send(announceH)
              }else if(args[1]){
                  message.delete();
              let msgARGS = args.slice(1).join(" "); 
              client.channels.cache.get('824918082006548492').send(msgARGS)
                    message.channel.send("Announcement sent to <#824918082006548492>")
              }
            }
            else message.channel.send("Missing Admin perm!")
              break;     

         case 'shutdown': 
                if (!message.author.id == '424568410765262848')
                  return;
          
                message.channel.send('Shutting down...').then(m => {
                  client.destroy();
                });
                break; 

                case 'userinfo':
                let infoMention = message.mentions.users.first()
                if(!infoMention){
                    let self = message.guild.member(message.author)
                    const SelfInfo = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                       .setTitle('👤 User Info')
                       .setThumbnail(message.author.displayAvatarURL())
                       .addField('Username:' , `\`${message.author.tag}\``, true)
                       .addField('User ID:' , `\`${message.author.id}\``,true)
                       .addField('🚦 Status:' , `${self.presence.status}`)
                       .addField('⌛️ Joined at:', `\`${self.joinedAt}\``, true)
                       .addField('⏱ Created at:' , `\`${message.author.createdAt}\``, true)
                       .addField(`Roles: (${self.roles.cache.size})`, self.roles.cache.map(r => `${r}`).join(' | '), true)
                       .setFooter(client.user.username, client.user.displayAvatarURL())
                       .setTimestamp()
                       message.channel.send(SelfInfo)

                }else if(infoMention){
                    let Tagh = message.guild.member(message.author)
                    let infoMen = message.guild.member(infoMention)
                    const TagInfo = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                       .setTitle('👤 User Info')
                       .setThumbnail(infoMention.displayAvatarURL())
                       .addField('Username:' , `\`${infoMention.tag}\``,true)
                       .addField('User ID:' , `\`${infoMention.id}\``,true)
                       .addField('🚦 Status:' , `${infoMention.presence.status}`)
                       .addField('⌛️ Joined at:', `\`${Tagh.joinedAt}\``, true)
                       .addField('⏱ Created at:' , `\`${infoMention.createdAt}\``, true)
                       .addField(`Roles: (${infoMen.roles.cache.size})`, infoMen.roles.cache.map(r => `${r}`).join(' | '), true)
                       .setFooter(client.user.username, client.user.displayAvatarURL())
                       .setTimestamp()
                       message.channel.send(TagInfo)
                }
                break;

                case "eval":
              if (!message.author.id == '424568410765262848') return message.channel.send("You can't use this command!")
        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }

            const evalargs = message.content.split(" ").slice(1);

              if  (message.author.id == '424568410765262848') {
              try {
                const code = evalargs.join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);

                message.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
            } else {
                message.react('❌');
                message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
            };
        break;

        case 'tickle':
         const tickler = message.mentions.users.first();
                     if(!tickler)
                         return message.reply('Mention someone to tickle!');
         
                     superagent.get('https://nekos.life/api/v2/img/tickle')
                         .end((err, response) => {
                       const tickleembed = new Discord.MessageEmbed()
                       .setTitle(tickler.username + " just got tickled by " + message.author.username)
                       .setImage(response.body.url)
                       .setColor(`RANDOM`) 
                       .setDescription((tickler.toString() + " got tickled by " + message.author.toString()))
                       .setFooter(client.user.username, client.user.displayAvatarURL())
                       .setTimestamp()
                       .setURL(response.body.url);
                   message.channel.send(tickleembed);
                         })
                   break;

        case 'hug':
         const hugger = message.mentions.users.first();
         if(!hugger)
                         return message.reply('Mention someone to hug!');
           superagent.get("https://nekos.life/api/v2/img/hug")
             .end((err, response) => {
            const hugembed = new Discord.MessageEmbed() 
            .setTitle(hugger.username + " just got hugged by " + message.author.username) 
            .setImage(response.body.url) 
            .setColor('RANDOM') 
            .setDescription((hugger.toString() + " got hugged by " + message.author.toString()))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setURL(response.body.url);
            message.channel.send(hugembed)
           })
           break;

           case 'hug':
         const kisser = message.mentions.users.first();
         if(!kisser)
                         return message.reply('Mention someone to kiss!');
           superagent.get("https://nekos.life/api/v2/img/kiss")
             .end((err, response) => {
            const kissembed = new Discord.MessageEmbed() 
            .setTitle(kisser.username + " just got kissed by " + message.author.username) 
            .setImage(response.body.url) 
            .setColor('RANDOM') 
            .setDescription((kisser.toString() + " got kissed by " + message.author.toString()))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setURL(response.body.url);
            message.channel.send(kissembed)
           })
           break;

           case 'punch':
         const puncher = message.mentions.users.first();
         if(!puncher)
                         return message.reply('Mention someone to punch!');
           superagent.get("https://nekos.life/api/v2/img/punch")
             .end((err, response) => {
            const punchembed = new Discord.MessageEmbed() 
            .setTitle(puncher.username + " just got punched by " + message.author.username) 
            .setImage(response.body.url) 
            .setColor('RANDOM') 
            .setDescription((puncher.toString() + " got punched by " + message.author.toString()))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setURL(response.body.url);
            message.channel.send(punchembed)
           })
           break;

           case 'poke':
         const poker = message.mentions.users.first();
         if(!poker)
                         return message.reply('Mention someone to poke!');
           superagent.get("https://nekos.life/api/v2/img/punch")
             .end((err, response) => {
            const pokembed = new Discord.MessageEmbed() 
            .setTitle(poker.username + " just got poked by " + message.author.username) 
            .setImage(response.body.url) 
            .setColor('RANDOM') 
            .setDescription((poker.toString() + " got poked by " + message.author.toString()))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setURL(response.body.url);
            message.channel.send(pokembed)
           })
           break;

        case 'baka':
                superagent.get('https://nekos.life/api/v2/img/baka')
                .end((err, response) => {
              const lewdembed = new Discord.MessageEmbed()
              .setTitle("BAKA!!!")
              .setImage(response.body.url)
              .setColor(`RANDOM`)
              .setFooter(`idiot!`)
              .setURL(response.body.url)
              .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTimestamp()
          message.channel.send(lewdembed);
            })  
              break;

              case "coinflip":
              case 'cf':
                case 'toss':
                  case 'cointoss':
              
      
              let answers = [
                  'heads',
                  'tails'
              ];
      
              message.channel.send({embed: {
                  color: 3447003,
                  title: "Coinflip:",
                  fields: [{
                      name: "Result",
                      value: `\`${answers[~~(Math.random() * answers.length)]}\``
                    }
                  ],
                  timestamp: new Date(),
                  footer: {
                    icon_url: client.user.displayAvatarURL(),
                    text: client.user.username
                  }
                }
              });
              break;

              case "botnick":
             
      
              const botnickname = message.content.split(' ').slice(1).join(' ');
      
              if ((message.author.id == '424568410765262848') || (message.member.hasPermission("ADMINISTRATOR", explicit = true))){
                  message.guild.members.cache.get(client.user.id).setNickname(botnickname);
                  message.channel.send('Done. :ok_hand:');
              } else {
                  message.react('❌');
                  message.channel.send(`\`📛\` You don't have permissions to execute that command.`);
              }
              break;

              case 'ping':
               const m = await message.channel.send("If you can see this the bot is slow or the discord api is slow");
               m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
                 
             break;

             case "roll":
         
          let rollnumber = message.content.split(' ').slice(1).join(' ');
  
          if (!rollnumber) {
              return message.reply(`:game_die: Just rolled a number: **${Math.floor(Math.random() * 100) + 1}**`);
          }
  
          message.reply(`:game_die: Just rolled a number: **${Math.floor(Math.random() * rollnumber) + 1}**`);
          break;

          case "8ball":
                    
            let question = message.content.split(' ').slice(1).join(' ');
    
            if (!question) {
                return message.reply(`What question should I answer on?\n\**Usage:** ${PREFIX}8ball is Blue Malgeran is sexy af?\``);
            }
    
          message.channel.send({embed: {
            color: 3447003,
            author: {
              name: `8ball`,
              icon_url: 'https://magic-8ball.com/assets/images/magicBallStart.png'
            },
            fields: [{
              name: question,
                value: `**My answer:** ${fortunes[~~(Math.random() * fortunes.length)]}`
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.displayAvatarURL(),
              text: client.user.username
            }
          }
        });
            break;

            case 'videos':
               const videos = new Discord.MessageEmbed()
              .setTitle("YAAR🤦!!!")
              .setImage('https://pbs.twimg.com/media/EQ5oE9aUUAEmbTk.jpg')

              .setColor(`RANDOM`)
              .setFooter(client.user.username, client.user.displayAvatarURL())
                  .setTimestamp()
          message.channel.send(videos);
              break;

          case 'calculate':
            case "calc":
                    let math = require('math-expression-evaluator');
                    let calcArgs = message.content.split(' ').slice(1).join(' ');
    
                    if (!calcArgs[0]) {
                        message.channel.send({embed: {
                            color: 3447003,
                            footer: {
                              icon_url: client.user.avatarURL,
                              text: "Please input an expression."
                            }
                          }
                        });
                    }
                    let calcResult;
                    try {
                        calcResult = math.eval(calcArgs);
                    } catch (e) { 
                        calcResult = 'Error: "Invalid Input"';
                    }
    
                    message.channel.send({embed: {
                        color: 3447003,
                        author: {
                          name: 'PokeSupport\'s calculator',
                          icon_url: client.user.avatarURL()
                        },
                        fields: [
                            { name: "Input", value: `\`\`\`js\n${calcArgs}\`\`\`` },
                          { name: "Output", value: `\`\`\`js\n${calcResult}\`\`\`` }
                        ],
                        timestamp: new Date(),
                        footer: {
                          icon_url: client.user.displayAvatarURL(),
                          text: client.user.username
                        }
                      }
                    });
                break;

          case "advice":
      
              const advicesf = require('snekfetch');
      
                  let r = await advicesf.get('http://api.adviceslip.com/advice');
      
                  let advice = JSON.parse(r.body).slip.advice;
      
                  message.channel.send({embed: {
                      color: 3447003,
                      author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL()
                      },
                      fields: [{
                          name: "Advice:",
                          value: `\`${advice}\``
                        }
                      ],
                      timestamp: new Date(),
                      footer: {
                        icon_url: client.user.displayAvatarURL(),
                        text: client.user.username
                      }
                    }
                  });
              break;

          case "dick":
       

        let dicksize = ["8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D", "8=========D", "8==========D", "404 not found"];
        let dickuser = message.mentions.users.first();

        if (!dickuser) {
            return message.channel.send('You must mention someone!\n(This is 100% accurate!)');
        }
        if (dickuser.id == "424568410765262848") {
            return message.channel.send(`**${dickuser} Size: ** 8=============================D\nSized by **${message.author.tag}**`);
        }

         message.channel.send(`**${dickuser} Size: ** ${dicksize[~~Math.floor(Math.random() * dicksize.length)]}\nSized by **${message.author.tag}**`);
        break;

             case 'urban':
            const bargs =  message.content.split(' ');
            const searchString = bargs.slice(1).join(' ')
            if(!searchString)return message.channel.send(`You have to type in word`)
            
            
            
          urban(searchString).then(urbans=>{
            
            message.channel.send({embed: {
                    
                description: `__**${urbans.word}**__\n\n**Definition**\n${urbans.definition}\n\n**Example**\n${urbans.example}\n\n**Tags:** ${urbans.tags}\n\n👍 **${urbans.thumbsUp}** *Thumbs Up* **|** 👎 **${urbans.thumbsDown}** *Thumbs Down*`,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL(),
                },
                color: 0xff0000,
            
          
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.displayAvatarURL(),
                  text: client.user.username
                }
            
            }
          })
          })
            
          break;

              case 'uptime':
  if(!message.member.hasPermission('ADMINISTRATION')) return message.channel.send("You need ADMIN perms to use this command!")
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    message.channel.send(duration)
    break;


              case "issue":
            let issue = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
             .setTitle("ISSUE")
             .setDescription('If the bot got some bugs you can report them to <@424568410765262848> in DMs!')
             .setColor(0x615CA4)
             .setFooter(client.user.username, client.user.displayAvatarURL())
             .setTimestamp()
            message.channel.send(issue);
            break;

              case "quote":
      
              const fetchquote = require('snekfetch');
              fetchquote.get('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en').then(quote => {
                  if (quote.body.quoteText === undefined) {
                      return message.reply('Something is messing up the API try again please!');
                  }
      
                  message.channel.send({embed: {
                      color: 3447003,
                      author: {
                        name: 'A smart guy said once:',
                        icon_url: 'http://pngimages.net/sites/default/files/right-double-quotation-mark-png-image-80280.png'
                      },
                      fields: [{
                          name: "Quote with source",
                          value: `"${quote.body.quoteText}"\n**Author:** ${quote.body.quoteAuthor}\n**Source:** ${quote.body.quoteLink}`
                        }
                      ],
                      timestamp: new Date(),
                      footer: {
                        icon_url: client.user.displayAvatarURL(),
                        text: client.user.username
                      }
                  }
              })
              });
              break;


                /*case "dog":
                  
          
                  
          
                  let {body} = await superagent
                  .get(`https://random.dog/woof.json`);
          
                  let dogpicembed = new Discord.MessageEmbed()
                  .setColor('#ff9900')
                  .setTitle('Dog Picture')
                  .setImage(body.url);
                  .setFooter(bot.user.username, bot.user.displayAvatarURL())
                  .setTimestamp()
                  message.channel.send(dogpicembed);
                  break;*/


    }
   }

   })

   fs.readdir('./events/', (err, files) => {
      if (err) return console.error;
      files.forEach(file => {
          if (!file.endsWith('.js')) return;
          const evt = require(`./events/${file}`);
          let evtName = file.split('.')[0];
          console.log(`Loaded event '${evtName}'`);
          client.on(evtName, evt.bind(null, client));
      });
  });
  
    
   client.mongoose.init();
   client.login(process.env.token);
 