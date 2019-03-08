const Discord = require("discord.js");
  
module.exports.run = async (bot, message) => {
    let embed = new Discord.RichEmbed()
    .setColor("#15f153")
    .addField(`❯ Ping ${message.author.username}`, (new Date().getTime() - message.createdTimestamp + " ms"))
    message.channel.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "ping"
}