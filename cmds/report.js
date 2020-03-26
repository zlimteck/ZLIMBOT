const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let reportUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!reportUser) return message.reply("Impossible de trouver cet user.");
    let reportreason = args.join(" ").slice(22);
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#D50A0A")
    .addField("❯ Report User", `${reportUser} ID ${reportUser.id}`)
    .addField("❯ Report par", `${message.author} ID ${message.author.id}`)
    .addField("❯ Report depuis le channel", message.channel)
    .addField("❯ Date", message.createdAt)
    .addField("❯ Raison(s)", reportreason);
    var reportschannel = message.guild.channels.find(reportschannel => reportschannel.name === "reports")
    if (!reportschannel) return message.channel.send("Impossible de trouver le salon reports.");
    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "report"
}