const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    let botmessage = args.join(" ");
    message.delete().catch();
    let embed = new Discord.RichEmbed()
    .setTitle("❯ Image:")
    .setColor("#D50A0A")
    .setURL(args.join(" "))
    .setImage(args.join(" "))
    .setFooter(`Image envoyée par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Image envoyé par ${message.author.username}: ${args.join(" ")}`)
}

module.exports.help = {
    name: "img"
}    