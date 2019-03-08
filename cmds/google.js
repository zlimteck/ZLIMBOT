const Discord = require("discord.js");
const google = require("google");

module.exports.run = async (client, message, args) => {
    google.resultsPerPage = 1
    google.protocol = 'http'
    google.protocol = 'https'
    var nextCounter = 0
    google(args, function (err, res){
        if (err) console.log(err);
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            if (link.title == null){
                return void(0)
            }
            if (link.href == null) {
                return void(0)
            }

            let embed = new Discord.RichEmbed()
            .setAuthor(`Google resultats pour ${args}`.split(',').join(' '))
            .setColor("#7FC6BC")
            .setThumbnail("https://i.imgur.com/0UqMz6O.png")
            .addField(`SITE`, link.title)
            .addField(`DESCRIPTION`, link.description)
            .addField(`URL`, link.href)
            .setFooter(`Demandé par ${message.author.username}`)
            .setTimestamp()
            message.channel.send({embed: embed});
            message.delete().catch();
        }
    });
}

module.exports.help = {
    name: "google"
}
