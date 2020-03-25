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

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "emojis"
}