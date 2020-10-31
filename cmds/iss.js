const Discord = require("discord.js");
const {get} = require("snekfetch");

module.exports.run = async (bot, message) => {
    const {body} = await get("https://api.wheretheiss.at/v1/satellites/25544")
    let embed = new Discord.RichEmbed()
    .setTitle("ISS")
    .setColor("#B0B0B0")
    .setDescription("ISS Position")
    .setThumbnail('https://i.imgur.com/d4PFOSv.jpg')
    .addField('Latitude', body.latitude, true)
    .addField('Longitude', body.longitude, true)
    .addField('Altitude', body.altitude, true)
    .addField('Visibilité', body.visibility, true)
    .setImage('https://i.imgur.com/7ypOKTa.jpg')
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
    message.channel.send({embed: embed});
    message.delete().catch();
    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name: "iss"
}