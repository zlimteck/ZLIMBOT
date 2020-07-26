const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
    const user = message.mentions.users.first() || message.author;
    if (user.presence.game !== null && user.presence.game.type === 2 && user.presence.game.name === "Spotify") {
        const trackIMG = user.presence.game.assets.largeImageURL;
        const trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
        const trackName = user.presence.game.details;
        const trackAuthor = user.presence.game.state;
        const trackAlbum = user.presence.game.assets.largeText;
        let embed = new Discord.RichEmbed()
        .setAuthor("Spotify Musique Infos", "https://i.imgur.com/2klysCl.png")
        .setColor("#1ED760")
        .setThumbnail(trackIMG)
        .addField("Musique", trackName)
        .addField("Album", trackAlbum, true)
        .addField("Artiste(s)", trackAuthor)
        .addField("Ecouter cette musique:", `[\`${trackURL}\`](trackURL)`)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp()
        message.channel.send({embed: embed});
        message.delete().catch();
    } else {
        message.channel.send("Vous n'écoutez rien actuellement sur Spotify!");
    }

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
};

module.exports.help = {
    name: "spotify",
}    