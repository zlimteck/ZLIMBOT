const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args[0] =="help") {
        message.reply("Usage: !approved @TONPSEUDO");
        return;
    }

    let target = message.mentions.users.first() || message.author;
    let approvedEmbed = new Discord.RichEmbed()
    .setTitle("Demande de membre approuvé")
    .setThumbnail(target.displayAvatarURL)
    .addField("❯ Message", `${target}#${target.discriminator} souhaite etre un membre approuvé !`)
    .addField("❯ Role(s)", `${message.guild.member(target).roles.map(roles => `\`${roles.name}\``).slice(0).join(", ")}`)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    var approvedchannel = message.guild.channels.find(approvedchannel => approvedchannel.name === "approved");
    if (!approvedchannel) return message.channel.send("Impossible de trouver le salon approved.");
    message.channel.send(`${target} Ta demande a bien été prise en compte, merci de patienter qu'un membre du STAFF vous approuve !`).then(msg => msg.delete(20000))
    approvedchannel.send(approvedEmbed);
    message.delete().catch();
}

module.exports.help = {
    name: "approved"
}