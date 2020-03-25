const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    let mpUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let mpMessage = args.join(" ").slice(22);
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    let botmessage = args.join(" ");
    message.delete().catch();
    mpUser.send(`${mpUser} ${mpMessage}`)
    message.author.send(`${message.author} Tu as envoyé un message privé a ${mpUser}`)

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "mp"
}