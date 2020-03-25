const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {
    try {
        const query = args.join(" ");
        const {body} = await snekfetch
        .get('https://itunes.apple.com/search')
        .query({
            term: query,
            media: 'music',
            entity: 'album',
            limit: 1,
            explicit: message.channel.nsfw ? 'yes' : 'no',
        });

        const body2 = JSON.parse(body.toString());
        if (!body2.results.length) return message.channel.send('Impossible de trouver des résultats.');
        const data = body2.results[0];
        let embed = new Discord.RichEmbed()
        .setAuthor('iTunes', 'https://i.imgur.com/PR29ow0.jpg', 'https://www.apple.com/itunes/')
        .setColor("#1ED760")
        .setURL(data.collectionViewUrl)
        .setThumbnail(data.artworkUrl100)
        .setTitle(data.collectionName)
        .addField('❯ Artiste(s)', data.artistName, true)
        .addField('❯ Album', data.collectionName, true)
        .addField('❯ Release Date', new Date(data.releaseDate).toDateString().split(' ')[2] + ' ' + new Date(data.releaseDate).toDateString().split(' ')[1] + ' ' + new Date(data.releaseDate).toDateString().split(' ')[3], true)
        .addField('❯ Genre', data.primaryGenreName, true)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp()
        message.channel.send({embed: embed});
        message.delete().catch();
    } catch (err) {
        if (err.statusCode === 400) {
            returnmessage.channel.send('Code de pays invalide. Faire référence à <https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes>.');
        }
        return message.channel.send(`Oh non, une erreur est survenue : \`${err.message}\`. Réessayez plus tard!`);
    }

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "itunes"
}   