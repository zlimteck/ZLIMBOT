const Discord = require("discord.js");
const {get} = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    const {body} = await get("https://api.nasa.gov/planetary/apod?api_key=WHsJtJDvvS8GOaYdXMhKVkqN9Tr1xPkFLGnF4uo5")
    let embed = new Discord.RichEmbed()
    .setTitle("NASA")
    .setColor("#F7BA2A")
    .setDescription("Voici la photo du jour du site de la NASA")
    .setImage(body.hdurl)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
    message.channel.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "nasa"
}    
