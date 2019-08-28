const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0] || !args[1] || args[0 == "help"]) return message.reply("Usage: !seed @Username link titre");
    let target = message.mentions.users.first() || message.author;
    let link = args[1];
    let titre = args[2];
    message.delete().catch();
    let embed = new Discord.RichEmbed()
    .setTitle("**NO SEED**")
    .addField("Lien:", link)
    .addField("Titre:", titre)
    .addField("User:", `${target} Merci de passer ce torrent en seed !`)
    .setTimestamp()
    target.send({embed: embed});
    message.author.send(`${message.author} La demande de mise en seed a bien était envoyé a ${target}`)
}

module.exports.help = {
    name: "seed"
}
