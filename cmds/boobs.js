const Discord = require("discord.js");
const { get } = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":underage: Tu dois etre dans un channel NSFW pour exécuter cette commande !");
    const {body} = await get("http://api.oboobs.ru/boobs/0/1/random")
    let embed = new Discord.RichEmbed()
    .setTitle("Boobs")
    .setDescription("Voici une photo de boobs mon cochon...")
    .setColor("#E642AA")
    .setImage(`http://media.oboobs.ru/${body[0].preview}`)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
    message.channel.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "boobs"
}