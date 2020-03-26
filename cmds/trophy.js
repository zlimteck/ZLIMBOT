const Discord = require("discord.js");
const fs = require('fs')
let success = require("../success.json");

module.exports.run = async (bot, message, args) => {

        let trophySTAFF = success.STAFF.trophy;
        let descriptionSTAFF = success.STAFF.description
        let obtentionSTAFF = success.STAFF.obtention
        let trophyVIP = success.VIP.trophy;
        let descriptionVIP = success.VIP.description
        let obtentionVIP = success.VIP.obtention
        let trophyNSFW = success.NSFW.trophy;
        let descriptionNSFW = success.NSFW.description
        let obtentionNSFW = success.NSFW.obtention
        let trophyCASINO = success.CASINO.trophy;
        let descriptionCASINO = success.CASINO.description
        let obtentionCASINO = success.CASINO.obtention
        let trophyECOIN = success.ECOIN.trophy;
        let descriptionECOIN = success.ECOIN.description
        let obtentionECOIN = success.ECOIN.obtention

        let embed = new Discord.RichEmbed()
        .setTitle("**TROPHY**")
        .setDescription(`Trophy du serveur AFTER`)
        .setColor("#15f153")
        .addField('Trophy', trophySTAFF)
        .addField('Description:', descriptionSTAFF)
        .addField('Obtention:', obtentionSTAFF)
        .addField('Trophy', trophyVIP)
        .addField('Description:', descriptionVIP)
        .addField('Obtention:', obtentionVIP)
        .addField('Trophy', trophyNSFW)
        .addField('Description:', descriptionNSFW)
        .addField('Obtention:', obtentionNSFW)
        .addField('Trophy', trophyCASINO)
        .addField('Description:', descriptionCASINO)
        .addField('Obtention:', obtentionCASINO)
        .addField('Trophy', trophyECOIN)
        .addField('Description:', descriptionECOIN)
        .addField('Obtention:', obtentionECOIN)
        .setTimestamp()
        message.channel.send(embed);
        message.delete().catch();

        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name:"trophy"
}