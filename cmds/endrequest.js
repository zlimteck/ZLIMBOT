const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0] || !args[1] || args[0 == "help"]) return message.reply("Usage: !endrequest @User Réponse");
    let target = message.mentions.users.first() || message.author;
    let requestrep = args.join(" ");
    message.delete().catch();
    let embed = new Discord.RichEmbed()
    .setTitle("**END Request**")
    .addField("Réponse de la requete:", requestrep)
    .addField("User:", `${target} Voici la réponse de ta request !`)
    .setTimestamp()
    target.send({embed: embed});
    message.author.send(`${message.author} La réponse a la requête a bien était envoyé a ${target}`)

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "endrequest"
}