const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    if (args[0] == "help") {
        message.reply("Usage: !ban <user> <raison>");
        return;
    }

    let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!banUser) return errors.cantfindUser(message.channel);
    if (banUser.id === bot.user.id) return errors.botuser(message);
    let banRaison = args.join(" ").slice(22);
    if (!banRaison) return errors.noReason(message.channel);
    if (banUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, banUser, "MANAGE_MESSAGES");
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#D50A0A")
    .addField("Membre ban", `${banUser} ID ${banUser.id}`)
    .addField("Ban par", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("Ban depuis le channel", message.channel)
    .addField("Date", message.createdAt)
    .addField("Raison(s)", banRaison);
    var banchannel = message.guild.channels.find(banchannel => banchannel.name === "ban")
    if (!banchannel) return message.channel.send("Impossible de trouver le salon ban.")
    message.guild.member(banUser).ban(banRaison);
    banchannel.send(banEmbed);
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Le membre ${banUser} a etait bannie du serveur ${message.guild.name} pour la raison suivante: ${banRaison} ! le ${message.createdAt}`)
}

module.exports.help = {
    name: "ban"
}