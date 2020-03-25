const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    if (args[0] == "help"){
        message.reply("Usage: !kick <user> <raison>");
        return;
    }

    let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kickUser) return message.channel.send("Impossible de trouver ce membre!");
    let kickReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ce membre ne peux pas être kick!");
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#D50A0A")
    .addField("❯ Membre kick", `${kickUser} ID ${kickUser.id}`)
    .addField("❯ Kick par", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("❯ Kick depuis le channel", message.channel)
    .addField("❯ Date", message.createdAt)
    .addField("❯ Raison(s)", kickReason);
    var kickChannel = message.guild.channels.find(kickChannel => kickChannel.name === "kick")
    if(!kickChannel) return message.channel.send("Impossible de trouver le salon kick.");
    message.delete().catch(O_o=>{});
    message.guild.member(kickUser).kick(kickReason);
    kickChannel.send(kickEmbed);

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Le membre ${kickUser} a etait kick du serveur ${message.guild.name} pour la raison suivante: ${kickReason} ! le ${message.createdAt}`)

}

module.exports.help = {
    name:"kick"
}