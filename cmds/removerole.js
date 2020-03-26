const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return errors.noPerms(message, "MANAGE_ROLES_OR_PERMISSIONS");
  if (args[0] == "help") {
    message.reply("Usage: !removerole <user> <rôle>");
    return;
  }

  const user = message.mentions.members.first();
  const foundRole = message.guild.roles.find(role => role.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());
  var logschannel = message.guild.channels.find(logschannel => logschannel.name === "logs")
  if (!logschannel) return message.channel.send("Impossible de trouver le salon logs.");
  if (message.mentions.members.size < 1) return message.reply("Tu n'as pas spécifié de membre.");
  if (!foundRole) return message.reply("Tu n'as pas spécifié de rôle.");
  if (!user.roles.has(foundRole.id)) return message.reply("Ce rôle n'existe pas.");
  await (user.removeRole(foundRole.id));
  const logembed = new Discord.RichEmbed()
  .setColor("#121113")
  .setDescription(`Rôle: ${foundRole.name} retiré a <@${user.id}> par ${message.member}`)
  .setTimestamp()
  logschannel.send(logembed); 
  message.delete().catch()
  user.send(`Tu perd le rôle ${foundRole.name}`)

  console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
  console.log(`Retrait du role ${foundRole.name} a ${user} effectué par ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
  name: "removerole"
}