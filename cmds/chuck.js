const Discord = require("discord.js");
const snekfetch = require('snekfetch')

module.exports.run = async (bot, message, args) => {
    snekfetch.get('https://api.chucknorris.io/jokes/random')
    .then(response => {
        let embed = new Discord.RichEmbed()
        .setTitle(`Chuck Norris joke`)
        .setColor("#F7BA2A")
        .setThumbnail(response.body.icon_url)
        .setDescription(response.body.value)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp()
        message.channel.send({embed: embed});
        message.delete().catch();
    })
}

module.exports.help = {
    name: "chuck"
}