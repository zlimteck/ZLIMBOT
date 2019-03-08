const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (!args[0] || !args[1] || args[0 == "help"]) return msg.reply("Usage: sayinchan [channelid] [message]");
    let targetchannel = client.channels.get(args[0]);
    if (!targetchannel) return msg.channel.send("Impossible de trouver le salon." + args[0]);
    let message = args.slice(1).join(' ');
    targetchannel.send(message);
    msg.delete().catch();
}

module.exports.help = {
    name: "sayinchan"
}