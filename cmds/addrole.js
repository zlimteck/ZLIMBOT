const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args, lang) => {
    if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return errors.noPerms(message, "MANAGE_ROLES_OR_PERMISSIONS");
    if (args[0] == "help"){
        message.reply("Usage: !addrole <user> <rôle>");
        return;
    }

    const addedrole = args.slice(1).join(' ');
    const user = message.mentions.members.first();
    const foundRole = message.guild.roles.find(role => role.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());

    if (message.mentions.members.size < 1) return message.reply("Tu n'as pas spécifié de membre.");
    if (addedrole.length < 1) return message.reply("Tu n'as pas spécifié de rôle.");
    if (!foundRole) return message.reply("Ce rôle n'existe pas.");
    if (user.roles.has(foundRole.id)) return message.reply("L'user a déjà ce rôle.");

    var logschannel = message.guild.channels.find(logschannel => logschannel.name === "logs");
    if (!logschannel) return message.channel.send("Impossible de trouver le salon logs.");
    await (user.addRole(foundRole.id));
    const logembed = new Discord.RichEmbed()
    .setDescription(`Rôle: ${foundRole.name} assigné a <@${user.id}> par ${message.member}`)
    .setColor("#F8F9F9")
    .setTimestamp()
    logschannel.send(logembed);
    message.delete().catch();
    user.send(`Félicitations tu obtiens le rôle ${foundRole.name}`)

     console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
     console.log(`Ajout du role ${foundRole.name} a ${user} effectué par ${message.author.username} le ${message.createdAt}`)

};

module.exports.help = {
    name: "addrole"
}
