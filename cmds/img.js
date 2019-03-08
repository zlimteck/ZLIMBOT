const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    let botmessage = args.join(" ");
    message.delete().catch();
    let embed = new Discord.RichEmbed()
    .setTitle("❯ Image:")
    .setColor("#D50A0A")
    .setImage(args.join(" "))
    .setFooter(`Image envoyée par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "img"
}    