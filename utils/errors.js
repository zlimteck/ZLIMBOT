const Discord = require("discord.js");
const fs = require("fs");
let config = require ("../botsettings.json")

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Tu n'as pas la permission!")
    .setColor(config.red)
    .addField("Permission requise", perm);
    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(config.red)
    .setTitle("Error")
    .addField(`${user} has perms`, perms);
    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Tu ne peux pas ban le bot.")
    .setColor(config.red);
    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Impossible de trouver cet user.")
    .setColor(config.red);
    channel.send(embed).then(m => m.delete(10000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Stp indique une ou des raison(s).")
    .setColor(config.red);
    channel.send(embed).then(m => m.delete(10000));
}