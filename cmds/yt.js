const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ytdl = require("ytdl-core-discord");

module.exports.run = async (bot, message, args, ops) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (!message.member.voiceChannel) return message.channel.send('Tu dois etre dans un channel vocal !');
    if (message.guild.voiceChannel) return message.channel.send('Le bot est deja connecté dans un channel vocal');
    if (!args[0]) return message.channel.send('Ajoute un lien apres "!yt"');
    let validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send('Désolé ce lien est invalide ..');
    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    connection.playOpusStream(await ytdl(args[0]));
    let embed = new Discord.RichEmbed()
    .setColor("#606060")
    .setTitle("**Lecture Youtube**")
    .addField("Je joue:", `${info.title}`)
    .setURL(args[0])
    .setFooter(`Lecture lancé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
    message.delete().catch();
    
    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "yt"
}    