const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author || message.author.id;
    let face = ["https://i.imgur.com/IZqNH03.jpg", "https://i.imgur.com/eZtyY19.jpg", "https://i.imgur.com/P8AYfpE.jpg", "https://i.imgur.com/5EOqekW.jpg", "https://i.imgur.com/xFfcPZV.jpg", "https://i.imgur.com/jhvYppZ.jpg", "https://i.imgur.com/PYBcOEl.jpg", "https://i.imgur.com/gLBvixS.jpg"];
    var facersult = face[Math.floor(Math.random() * face.length)];

    message.delete().catch();
    let embed = new Discord.RichEmbed()
    .setTitle("Face")
    .setDescription(`Voici la face de ${target}`)
    .setColor("#D50A0A")
    .setImage(facersult)
    message.channel.send({embed: embed});

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Image envoyé par ${message.author.username}: ${args.join(" ")}`)
}

module.exports.help = {
    name: "face"
}    