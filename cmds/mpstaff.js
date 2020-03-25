const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let mp = args.join(" ");
    let mpEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setColor("#D50A0A")
    .addField("❯ MP de", `${message.author}`)
    .addField("❯ Message", mp)
    .addField("❯ Date", message.createdAt);
    var mpstaffchannel = message.guild.channels.find(mpstaffchannel => mpstaffchannel.name === "staff-mp")
    if (!mpstaffchannel) return message.channel.send("Impossible de trouver le salon staff-mp.");
    message.delete().catch(O_o=>{});
    mpstaffchannel.send(mpEmbed);

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "mpstaff"
}