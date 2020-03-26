const Discord = require("discord.js");

function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
        if (!member.user.bot) memberCount++;
    });
    return memberCount;
}

function checkBots(guild) {
    let botCount = 0;
    guild.members.forEach(member => {
        if (member.user.bot) botCount++;
    });
    return botCount;
}

module.exports.run = async (bot, message, args) => {
    let guild = message.channel.guild;
    let role = guild.roles.find(role => role.name)
    let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor("#15f153")
    .addField("❯ Nom du serveur", `${message.guild.name}`)
    .addField("❯ ID du serveur", message.guild.id)
    .addField("❯ Channels", message.guild.channels.size)
    .addField("❯ Roles", guild.roles.size, true)
    .addField("❯ Membres sur le serveur", message.guild.memberCount)
    .addField('❯ Humains', checkMembers(message.guild), true)
    .addField('❯ Bots', checkBots(message.guild), true)
    .addField("❯ Localisation du Serveur", message.guild.region)
    .addField("❯ Serveur vérifié", message.guild.verified)
    .addField("❯ Date création Serveur", message.guild.createdAt)
    .addField("❯ Admin", message.guild.owner)
    .addField("❯ AdminID", message.guild.ownerID)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "server"
}    