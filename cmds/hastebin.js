const Discord = require("discord.js");
const hastebin = require('hastebin-gen');

module.exports.run = async (bot, message, args) => {
    let icon = message.author.displayAvatarURL;
    let Usageembed = new Discord.RichEmbed()
    .setColor("#D40B25")
    .setTitle("**Usage**")
    .addField("Commande:", "``!hastebin <Ton message a poster dans Hastebin>``", true)
    .setFooter(`${message.author.username}`, icon);
    if (!args[0] || args[0] == "help") return message.channel.send(Usageembed) , console.log("Commande !hastebin erreur : Usage") , message.delete().catch();
    let haste = args.slice(0).join(" ")
    hastebin(haste).then(r => {
        let hastebinembed = new Discord.RichEmbed()
        .setColor("#002b36")
        .setTitle("**Hastebin**")
        .addField("URL:", r)
        .setFooter(`Hastebin`, icon)
        console.log(`L'url Hastebin de ${message.author.username} a bien etait envoye`)
        message.channel.send(hastebinembed);
    }).catch(console.error);
    message.delete();

    console.log(`Commande ${message.author.lastMessage} execute sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "hastebin"
}