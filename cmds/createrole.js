const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
        let createrole = args.join(" ")
        message.guild.createRole({
            name: createrole,
            color: "#000000",
            permissions:[]
        })
        
        message.channel.send(`Le role ${createrole} a bien été crée !`)
        message.delete().catch();

        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
        console.log(`Le role ${args.join(" ")} a été crée sur le serveur ${message.guild.name} par ${message.author.username} le ${message.createdAt}`)
    }

module.exports.help = {
    name: "createrole"
}