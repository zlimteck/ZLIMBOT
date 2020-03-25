const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete().catch();
    let Iconmessage = await message.channel.send("Chargement de l'affichage de l'icone du Serveur en cours...");
    if (!message.guild.iconURL) return Iconmessage.edit("Erreur .. Ce serveur n'a pas d'icone !")
    await message.channel.send({files: [
        {
            attachment: message.guild.iconURL,
            name: "Icone.png"
        }
    ]});

    Iconmessage.delete();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
}

module.exports.help = {
    name: "icon"
}    
