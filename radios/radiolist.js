const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Liste des Radios")
    .setDescription("Tu dois etre connecter a un salon vocal pour executer les commandes suivante")
    .setThumbnail("https://i.imgur.com/RVH6pir.png")
    .addField("Coretime.fm:", "!coretime")
    .addField("Technobase.fm:", "!technobase")
    .addField("Clubtime.fm:", "!clubtime")
    .addField("Hardcore Radio:", "!hardcoreradio")
    .addField("Fun Radio France:", "!funradio")
    .addField("Contact:", "!contact")
    .addField("NRJ France:", "!nrj")
    .addField("Skyrock:", "!skyrock")
    .addField("Radio FG:", "!radiofg")
    .addField("Galaxie Radio", "!galaxie")
    .addField("Techno4ever", "!techno4ever")
    .setColor('#606060')
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send(embed);
    message.delete().catch();
}

module.exports.help = {
    name: "radiolist",
}    
