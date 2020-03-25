const Discord = require("discord.js");
const hastebin = require('hastebin-gen');

module.exports.run = async (bot, message, args) => {
    if (!args[0] || args[0] == "help") return message.reply("Usage: !hastebin <Ton message a poster dans Hastebin>.");
    let haste = args.slice(0).join(" ")
    hastebin(haste).then(r => {
        message.channel.send("`Publié sur Hastebin à cette URL:`  " + r);
    }).catch(console.error);
    message.delete();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "hastebin"
}