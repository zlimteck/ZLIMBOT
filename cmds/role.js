const Discord = require("discord.js");
const errors = require("../utils/errors.js");


module.exports.run = async (bot, message, args) => {
    const roleName = args.join(" ");
    const role = message.guild.roles.find(r => r.name.toLowerCase() == roleName.toLowerCase());
    if (!role) return message.reply("Aucun role de ce nom n'est present sur ce serveur !");
    let haveRole = message.guild.members.filter(m => m.roles.get(role.id)).size;
    let Avatarbot = bot.user.displayAvatarURL;
    const embed = new Discord.RichEmbed()
    .setColor(role.hexColor)
    .setTitle('Informations sur le role '+ role.name)
    .setThumbnail(Avatarbot)
    .addField("Nom", role.name)
    .addField("Role ID", role.id)
    .addField("Couleur du Role (Hex)", role.hexColor)
    .addField("Position", role.position)
    .addField("Crée le", new Date(role.createdAt).toISOString().slice(0, 19).replace(/-/g, "/").replace(/T/g, " "))
    .addField("Membres", `Il y a ${haveRole} membres avec ce rôle.`)
    .addField("Permisisons", role.permissions)
    .addField("Autre informations", `Hoisted: ${role.hoist}\nManaged: ${role.managed}\nMentionable: ${role.mentionable}`)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
    message.channel.send({embed: embed});
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name: "role"
}