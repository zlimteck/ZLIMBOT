const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.mentions.users.size === 2) return message.channel.send("Tu dois mentionner deux personnes !")
    let user1 = message.mentions.users.first();
    let user2 = message.mentions.users.last();
    let member1 = message.guild.member(user1);
    let member2 = message.guild.member(user2);
    let number = Math.floor(Math.random() * 99) + 1;
    message.channel.send(`Entre ${member1.user.username} et ${member2.user.username}, il y a ${number}% d'amour ! :heart:`)
    message.delete().catch();
}

module.exports.help = {
    name: "love"
}    