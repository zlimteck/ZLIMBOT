const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const YTDL = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (!message.member.voiceChannel) return message.channel.send('Connecte toi a un channel vocal pour executer cette command');
    if (!message.guild.me.voiceChannel) return message.channel.send("Le bot n'est pas connecté");
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Tu n'es pas conecté dans le meme channel");
    message.guild.me.voiceChannel.leave();
    message.channel.send('Fin de la lecture, déconnexion du channel vocal ...');
    message.delete().catch();
}

module.exports.help = {
    name: "stop",
}    
