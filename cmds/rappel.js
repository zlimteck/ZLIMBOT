const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ms = require('ms')
const moment = require("moment");
require("moment-duration-format");


module.exports.run = async (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  let time = args[0]
  let raison = args.slice(1).join(" ")
  message.delete().catch();
  let embed = new Discord.RichEmbed()
  .setTitle(":date: Rappel")
  .addField("Rappel demandé:", raison)
  .addField("Dans:", time)
  .setColor("#7FC6BC")
  .setFooter(`Rappel crée par ${message.author.username}`)
  .setTimestamp()

  try {
    message.author.send({embed: embed})
    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Rappel crée par ${message.author.username} Raison: ${raison} Time: ${time}`)
  
  }catch(e) {
    message.channel.send({embed: embed})
    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Rappel crée par ${message.author.username} Raison: ${raison} Time: ${time}`)
  }

    setTimeout(() => {
      let embed = new Discord.RichEmbed()
      .setTitle(":date: Rappel")
      .setDescription(`<@${message.author.id}>`)
      .addField("Rappel demandé:", raison)
      .addField("Il y a:", time)
      .setColor("#7FC6BC")
      .setFooter(`Rappel crée par ${message.author.username}`)
      try {
        message.author.send({embed: embed})
        console.log(`Rappel effectué a ${message.author.username} Raison: ${raison} Time: ${time}`)
      }catch(e) {
        message.channel.send({embed: embed})
        console.log(`Rappel effectué a ${message.author.username} Raison: ${raison} Time: ${time}`)
      
      }
      }, ms(time))
  }

module.exports.help = {
  name: "rappel"
}