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
    let banReason = args.join(" ").slice(22);
    if (!banReason) return errors.noReason(message.channel);
    if (banUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, banUser, "MANAGE_MESSAGES");
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#D50A0A")
    .addField("Membre ban", `${banUser} ID ${banUser.id}`)
    .addField("Ban par", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("Ban depuis le channel", message.channel)
    .addField("Date", message.createdAt)
    .addField("Raison(s)", banReason);
    var banchannel = message.guild.channels.find(banchannel => banchannel.name === "ban")
    if (!banchannel) return message.channel.send("Impossible de trouver le salon ban.")
    message.guild.member(banUser).ban(banReason);
    banchannel.send(banEmbed);
}

module.exports.help = {
    name: "ban"
}