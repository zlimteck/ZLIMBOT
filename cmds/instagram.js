const Discord = require("discord.js");
const snekfetch = require('snekfetch')

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("!instagram ``lien de la publicataion``");
    try {
        let {body} = await snekfetch
        .get('https://api.instagram.com/oembed/?url=' + args[0])
        if (!body) return message.channel.send("Post Instagram non trouvé !");
        let embed = new Discord.RichEmbed()
        .setDescription(body.title)
        .setColor("#F7BA2A")
        .setTitle(body.author_name)
        .setImage(body.thumbnail_url)
        .addField("Source:", `[Profil](${body.author_url}) | [Post](${args[0]})`)
        .setFooter("Instagram")
        .setTimestamp();
        message.channel.send({embed: embed});
        message.delete().catch();

        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    }catch (err) {
        return console.log(err);
    }
}

module.exports.help = {
    name: "instagram"
}