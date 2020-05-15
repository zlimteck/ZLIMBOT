const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.mentions.users.size === 0) return message.channel.send("Tu dois mentionner deux personnes !")
    let user1 = args[0];
    let user2 = args[1];
    if (!args[0] || args[0 == "null"]) return message.reply("Tu dois mentionner deux personnes !");
    if (!args[1] || args[1 == "null"]) return message.reply("Tu dois mentionner deux personnes !");
    let number = Math.floor(Math.random() * 99) + 1;
    let loveplusembed = new Discord.RichEmbed()
    .setTitle("Love")
    .setDescription(`Test de love`)
    .addField("Membres", `${user1} + ${user2}`)
    .addField("Resultat", `${number}% :two_hearts:`)
    .setColor("#D50A0A")
    .setImage("https://i.imgur.com/RAwPNKH.png")
    if (number > 90) return message.channel.send(loveplusembed), message.delete().catch();

    let loveembed = new Discord.RichEmbed()
    .setTitle("Love")
    .setDescription(`Test de love`)
    .addField("Membres", `${user1} + ${user2}`)
    .addField("Resultat", `${number}% :heart:`)
    .setColor("#D50A0A")
    if (number < 90) return message.channel.send(loveembed), message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "love"
}    