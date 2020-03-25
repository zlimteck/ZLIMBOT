const discord = require("discord.js");
const ms = require('ms')
const moment = require("moment");
require("moment-duration-format");
 
module.exports.run = async (bot, message, args) => {
 
    var price = "";
    const duration = moment.duration(bot.uptime).format(" d [days], h [hrs], m [mins], s [secs]");
    var time;
    var winnerCount;
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
 
    winnerCount = args[0];
    time = args[1];
    price = args.splice(2, args.length).join(' ');
 
    message.delete();
 
    var date = new Date().getTime();
    var dateTime = new Date(date + ms(time));
 
    var giveawayEmbed = new discord.RichEmbed()
    .setTitle("🎉 **GIVEAWAY** 🎉")
    .addField("Giveaway lancé par:", `${message.author.username}`)
    .addField("Giveaway pour:", "@everyone")
    .addField("Gain:", price)
    .addField("Temps de participation:", time)
    //.addField("Nombre de gagnants:", winnerCount)
    .addField("Info:", "cliquez sur 🎉 pour participer au giveaway")
    .setFooter(`Ce termine dans: ${dateTime}`)
 
    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Nouveau giveaway lancé par ${message.author.username} Time: ${args[1]} Price: ${price}`)
 
    setTimeout(function () {
 
        var random = 0;
        var winners = [];
        var inList = false;
 
        var peopleReacted = embedSend.reactions.get("🎉").users.array();

        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        if (peopleReacted.length == 0) {
            return message.channel.send("Personne n'a gagné, alors c'est le bot qui remporte le giveaway");
        }
 
        if (peopleReacted.length < winnerCount) {
            return message.channel.send("Trop peu de joueurs ont participé, le bot a donc remporté le giveaway");
        }
 
        for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
            random = Math.floor(Math.random() * peopleReacted.length);
 
            for (var y = 0; y < winners.length; y++) {
                if (winners[y] == peopleReacted[random]) {
                    i--;
                    inList = true;
                    break;
                }
            }
 
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
 
        for (var i = 0; i < winners.length; i++) {
            message.channel.send("Bravo " + winners[i] + ` tu as gagné **${price}** !`);

            console.log(`Giveaway gagné par ${winners[i]}`)
            
        }
 
    }, ms(time))
 
}
 
module.exports.help = {
    name: "giveaway",
}