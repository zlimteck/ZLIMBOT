const Discord = require("discord.js");
const search = require('yt-search');

module.exports.run = async (bot, message, args) => {
    if (!args[0] || args[0] == "help") return message.reply("Usage: !youtube <Titre de la video>");
    search(args.join(' '), function (err, results) {
        if (err) return console.log(err);
        let videos = results.videos.slice(0, 5);
        let resp = '';
        for (var i in videos) {
            resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
        }

        resp += `\n**Choisissez un nombre entre** \`1-${videos.length}\``;
        message.channel.send(resp).then(msg => msg.delete(20000));
        const filter = m => !isNaN(m.content) && m.content <= videos.length+1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });
        collector.videos = videos;
        collector.once('collect', function(m) {
            message.channel.send("https://www.youtube.com/" + this.videos[parseInt(m.content) - 1].url);
            message.delete().catch();
        })

    });

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "youtube"
}    