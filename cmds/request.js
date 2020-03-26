const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0] || !args[1] || args[0 == "help"]) return message.reply("Usage: !request Ta Requête");
    let request = args.join(" ");
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setColor("#D50A0A")
    .setTitle("**Requête**")
    .addField("Du membre", `${message.author}`)
    .addField("Requête", request)
    .addField("Date", message.createdAt);
    var requestchannel = message.guild.channels.find(requestchannel => requestchannel.name === "requête")
    if (!requestchannel) return message.channel.send("Impossible de trouver le salon request.");
    message.channel.send(`${message.author} Ta requête a bien été prise en compte, tu recevras un MP quand celle-ci sera complétée !`);
    requestchannel.send(embed);
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "request"
}