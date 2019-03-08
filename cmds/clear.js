const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (!args[0]) return message.channel.send("Tu n'as pas la permission d'exécuté cette commande!");
    message.channel.bulkDelete(args[0]).then(() => {
        message .channel.send(`${args[0]} messages supprimé(s).`).then(msg => msg.delete(3000));
    });
}

module.exports.help = {
    name:"clear"
}