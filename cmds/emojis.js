const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const emoji = message.guild.emojis;
    if (!emoji.size) return message.channel.send("Le serveur n'a pas d'emojis")
    let embed = new Discord.RichEmbed()
    .setColor("#15f153")
    .addField("Emojis du serveur", emoji.map((e) => e).join(' '))
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "emojis"
}