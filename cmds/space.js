const Discord = require("discord.js");
const randomPuppy = require('random-puppy');
const request = require('snekfetch');

module.exports.run = async (bot, message, args) => {
    var subreddits = [
        "nasa",
        "spaceX",
        "space",
    ]
    var sub = subreddits[Math.floor(Math.random() * subreddits.length)];
    randomPuppy(sub)
    .then(url => {
        let embed = new Discord.RichEmbed()
        .setTitle("Space")
        .setColor("#F7BA2A")
        .setDescription("Voici une photo spatial")
        .setImage(url)
        .setTimestamp()
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp();
        message.channel.send({embed: embed});
        message.delete().catch();
    })
}

module.exports.help = {
    name: "space"
}   