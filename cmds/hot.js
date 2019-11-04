const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
const request = require('snekfetch');

module.exports.run = async (bot, message, args) => {
    var subreddits = [
        "gonewild",
    ]
    var sub = subreddits[Math.floor(Math.random() * subreddits.length)];
    randomPuppy(sub)
    .then(url => {
        let embed = new Discord.RichEmbed()
        .setTitle("Hot")
        .setColor("#F7BA2A")
        .setDescription("Voici une photo HOT")
        .setImage(url)
        .setTimestamp()
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp();
        message.channel.send({embed: embed});
        message.delete().catch();
    })
}

module.exports.help = {
    name: "hot"
}   