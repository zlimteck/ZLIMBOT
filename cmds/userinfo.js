const Discord = require("discord.js");
const moment = require("moment")
const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    let guild = message.channel.guild;
    let role = guild.roles.find(role => role.name)
    let embed = new Discord.RichEmbed()
    .setAuthor("Infos User")
    .setThumbnail(target.displayAvatarURL)
    .setColor("#15f153")
    .addField("❯ Pseudo", `${target}`, true)
    .addField("❯ Discriminator", `#${target.discriminator}`, true)
    .addField("❯ ID", target.id)
    .addField("❯ Role(s)", `${message.guild.member(target).roles.map(roles => `\`${roles.name}\``).slice(0).join(", ")}`)
    .addField("❯ Status", `${status[target.presence.status]}`, true)
    .addField("❯ Joue a", target.presence.game, true)
    .addField("❯ Dernier Message", target.lastMessage)
    .addField("❯ Compte crée", target.createdAt)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
	message.delete().catch();
}

module.exports.help = {
    name: "userinfo"
}
