const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    let botmessage = args.join(" ");
    let embed = new Discord.RichEmbed()
    .setTitle("❯ Sondage:")
    .setColor("#D50A0A")
    .setDescription(args.join(" "))
    .addField("Definition des réactions:", ":thumbsup: : Pour :thumbsdown: : Contre :no_entry: : Neutre" )
    .setFooter(`Sondage crée par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed}).then(send => {
        send.react('👍');
        send.react('👎');
        send.react('⛔');
        message.delete().catch();
    });
}

module.exports.help = {
    name: "sondage"
}    