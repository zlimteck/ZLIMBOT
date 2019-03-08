const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Tu n'as pas la permission d'exécuter cette commande!");
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.sendMessage("Tu n'as pas spécifié un user ou un ID!");
    let role = message.guild.roles.find(r => r.name === "MUTED");
    if (!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("Cet user n'est pas muted!");
    await toMute.removeRole(role);
    delete bot.mutes[toMute.id];
    message.channel.send(`${toMute.user.tag} a était unmuted!`);
}

module.exports.help = {
    name: "unmute"
}