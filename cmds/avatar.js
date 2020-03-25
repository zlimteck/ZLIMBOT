const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete().catch();
    let target = message.mentions.users.first() || message.author;
    let Avatarmessage = await message.channel.send(`Chargement de l'affichage de l'avatar de ${target} en cours ...`);
    if (!message.author.displayAvatarURL) return Avatarmessage.edit("Erreur .. Ce membre n'a pas d'avatar !")
    await message.channel.send({files: [
        {
            attachment: target.displayAvatarURL,
            name: "Avatar.png"
        }
    ]});

    Avatarmessage.delete()

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
}

module.exports.help = {
    name: "avatar"
}