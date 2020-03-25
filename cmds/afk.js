const Discord = require("discord.js");
const ms = require("ms");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let time = args[0]
    let raison = args.slice(1).join(" ")
    let user = message.author
    let botmessage = `${user} **EST MAINTENANT AFK PENDANT ${time} !**`
    let embed = new Discord.RichEmbed()
    .setColor("#7FC6BC")
    .setDescription(raison)
    message.channel.send({embed: embed});
    message.channel.send(botmessage);
    message.delete().catch();

    setTimeout(() =>{
        let botmessage = `${user} **N'EST PLUS AFK !**`
        message.channel.send(botmessage);
    },ms(time))

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
}

module.exports.help = {
    name:"afk"
}