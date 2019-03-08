const Discord = require("discord.js");
const ascii = require("ascii-art");

module.exports.run = async (bot, message, args) => {
    let text = args.join(" ")
    if (!text) {
        return message.channel.send("Usage: !ascii texte")
    }

    ascii.font(text, "Graffiti", function (rendered) {
        rendered = rendered.trimRight()
        if (text.length >= 15) {
            return message.channel.send(`${message.author} Les arguments ne peuvent pas dépasser **15** caractères.`)
        }

        message.channel.send(rendered, {
            code: "md"
        })
    })

    message.delete
}

module.exports.help = {
    name: "ascii"
}