const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0] || !args[1] || args[0 == "help"]) return message.reply("Usage: !seed @Username link titre");
    let target = message.mentions.users.first() || message.author;
    let link = args[1];
    let titre = args[2];
    message.delete().catch();
    var releaseschannel = message.guild.channels.find(releaseschannel => releaseschannel.name === "releases");
    if (!releaseschannel) return message.channel.send("Impossible de trouver le salon releases.");
    let embed = new Discord.RichEmbed()
    .setTitle("**NO SEED**")
    .addField("Lien:", link)
    .addField("Titre:", titre)
    .addField("User:", `${target} Merci de passer ce torrent en seed !`)
    .setTimestamp()
    releaseschannel.send(embed);
    target.send({embed: embed});
    message.author.send(`${message.author} La demande de mise en seed a bien était envoyé a ${target}`)

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "seed"
}