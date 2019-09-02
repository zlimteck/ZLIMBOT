const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (!message.member.voiceChannel) return message.channel.send('Tu dois etre dans un channel vocal !');
    if (message.guild.voiceChannel) return message.channel.send('Le bot est deja connecté dans un channel vocal');
    if (!args[0]) return message.channel.send('Ajoute un lien apres "!yt"');
    let validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send('Désolé ce lien est invalide ..');
    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}));
	message.channel.send(`Je joue: ${info.title}`);
	message.delete().catch();
}

module.exports.help = {
    name: "yt"
}    
