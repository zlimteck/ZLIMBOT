const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const YTDL = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {
    if (!message.member.hasPermission("STREAM")) return errors.noPerms(message, "STREAM");
    //message.delete().catch();
    if (!message.member.voiceChannel) return errors.noinchanvocal(message);
    //message.delete().catch();
    if (!message.guild.me.voiceChannel) return errors.botpresence(message);
    //message.delete().catch();
    if (!message.guild.me.voiceChannelID) return errors.noevenchan(message);
    //message.delete().catch();
    message.guild.me.voiceChannel.leave();
    let stopembed = new Discord.RichEmbed()
    .setTitle("**Déconnexion**")
    .setDescription('Fin de la lecture, déconnexion du channel vocal ...')
    .setFooter(`Déconnexion effectuée par ${message.author.username}`)
    message.channel.send(stopembed);
    message.delete().catch();
    //message.channel.send('Fin de la lecture, déconnexion du channel vocal ...');
    //message.delete().catch();
}

module.exports.help = {
    name: "stop",
}    
