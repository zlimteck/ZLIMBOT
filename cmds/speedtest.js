const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const speedTest = require('speedtest-net');

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor("#15f153")
    .addField(`S'il vous plaît, attendez...`, `Cela peut prendre 20 à 40 secondes`, true);
    let Awaitmessage = await message.channel.send(embed)
    const speed = speedTest({maxTime: 5000, serverId: 5559});
    speed.on('data', async (data) => {
        embed.fields.pop()
        embed.addField(`Ping`, `${data.server.ping}`, true)
        embed.addField('Download Speed', `${data.speeds.download} Mbps`, true)
        embed.addField('Upload Speed', `${data.speeds.upload} Mbps`, true)
        embed.addField('ISP', `${data.client.isp}`, true)
        embed.addField('ISP Rating', `${data.client.isprating}`, true)
        embed.addField('Heure actuelle du serveur', moment().format('MMMM Do YYYY [|] HH:mm'), true)
        message.channel.send({embed: embed});
        Awaitmessage.delete().catch();
        message.delete().catch();
        console.log(`Resultat du speedtest du serveur ${data.client.isp}: Ping: ${data.server.ping} Download: ${data.speeds.download} Mbps Upload: ${data.speeds.upload} Mbps`)
    });

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name: "speedtest"
}    