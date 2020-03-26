const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (!args[0] || !args[1] || args[0 == "help"]) return message.reply("Usage: sayinchan [channelid] [message]");
    let targetchannel = bot.channels.get(args[0]);
    if (!targetchannel) return message.channel.send("Impossible de trouver le salon." + args[0]);
    let botmessage = args.slice(1).join(' ');
    targetchannel.send(botmessage);
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Message envoyer via le bot par ${message.author.username} dans le salon ${args[0]}`)

}

module.exports.help = {
    name: "sayinchan"
}