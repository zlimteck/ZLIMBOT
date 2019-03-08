const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`)
    .setColor("#7FC6BC")
    .setThumbnail("https://i.imgur.com/PzvIjod.png")
    .setTitle(`How long to beat`)
    .addField("TITRE", "Combien de temps faut-il pour terminé vos jeux préférés ...")
    .addField("DESCRIPTION", "Combien de temps durent vos jeux vidéo préférés ? HowLongToBeat a la réponse. Créez un backlog, soumettez vos temps de jeu et rivalisez avec vos amis !")
    .addField("URL", "https://howlongtobeat.com/")
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "hltb"
}    