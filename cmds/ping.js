const Discord = require("discord.js");
  
module.exports.run = async (bot, message) => {
    let embed = new Discord.RichEmbed()
    .setColor("#15f153")
    .addField(`❯ Ping ${message.author.username}`, (new Date().getTime() - message.createdTimestamp + " ms"))
    message.channel.send({embed: embed});
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "ping"
}