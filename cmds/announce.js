const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    let botmessage = args.join(" ");
    let embed = new Discord.RichEmbed()
    .setColor("#D50A0A")
    .setTitle("❯ Annonce:")
    .setDescription(args.join(" "))
    .setFooter(`Annonce crée par ${message.author.username}`)
    .setTimestamp();
    message.channel.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "announce"
}