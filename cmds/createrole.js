const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.channel.permissionsFor(message.member).hasPermission("ADMINISTRATOR")) {
        message.reply("Tu n'as pas la permission de créer un role")
    }else{
        let createrole = args.join(" ")
        message.guild.createRole({
            name: createrole,
            color: "#000000",
            permissions:[]
        })
        
        message.channel.send(`Le role ${createrole} a bien été crée !`)
    }
}

module.exports.help = {
    name: "createrole"
}