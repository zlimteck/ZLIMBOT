const Discord = require("discord.js");
const {get} = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":underage: Tu dois etre dans un channel NSFW pour exécuter cette commande !");
    const {body} = await get("https://nekobot.xyz/api/image?type=hentai")
    let embed = new Discord.RichEmbed()
    .setTitle("Hentai")
    .setColor("#E642AA")
    .setDescription("Voici une photo hentai mon cochon...")
    .setImage(body.message)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
    message.channel.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "hentai"
}