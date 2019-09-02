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
        .setAuthor("Spotify Track Info", "https://cdn.discordapp.com/emojis/408668371039682560.png")
        .setColor("#1ED760")
        .setThumbnail(trackIMG)
        .addField("Song Name", trackName)
        .addField("Album", trackAlbum, true)
        .addField("Author", trackAuthor)
        .addField("Listen to Track:", `[\`${trackURL}\`](trackURL)`)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp()
        message.channel.send({embed: embed});
        message.delete().catch();
    } else {
        message.channel.send("Ce membre n'écoute pas Spotify!");
    }
};

module.exports.help = {
    name: "spotify",
}    
