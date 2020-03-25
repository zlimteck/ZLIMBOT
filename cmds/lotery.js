const discord = require("discord.js");
const ms = require('ms')
const moment = require("moment");
let coins = require("../ecoin.json");
const fs = require("fs");
require("moment-duration-format");
 
module.exports.run = async (bot, message, args) => {
 
    var price = "";
    const duration = moment.duration(bot.uptime).format(" d [days], h [hrs], m [mins], s [secs]");
    var time;
    var winnerCount;
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
    if (isNaN(args[2])) return message.reply('Entre un montant valide !')
 
    winnerCount = args[0];
    time = args[1];
    price = args.splice(2, args.length).join(' ');
 
    message.delete();
 
    var date = new Date().getTime();
    var dateTime = new Date(date + ms(time));
 
    var loteryEmbed = new discord.RichEmbed()
    .setTitle("🏷️ **Lotery** 🏷️")
    .addField("Lotery lancé par:", `${message.author.username}`)
    .addField("Lotery pour:", "@everyone")
    .addField("Ecoin:", price)
    .addField("Temps de participation:", time)
    //.addField("Nombre de gagnants:", winnerCount)
    .addField("Info:", "cliquez sur 🏷️ pour participer a la Lotery")
    .setFooter(`Ce termine dans: ${dateTime}`)
 
    var embedSend = await message.channel.send(loteryEmbed);
    embedSend.react("🏷️");

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Nouvelle lotery lancé par ${message.author.username} Time: ${time} Ecoin: ${price}`)
 
    setTimeout(function () {
 
        var random = 0;
        var winners = [];
        var inList = false;
 
        var peopleReacted = embedSend.reactions.get("🏷️").users.array();

        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        if (peopleReacted.length == 0) {
            return message.channel.send("Personne n'a gagné, alors c'est le bot qui remporte la lotery");
        }
 
        if (peopleReacted.length < winnerCount) {
            return message.channel.send("Trop peu de joueurs ont participé, le bot a donc remporté la lotery");
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

            if (!coins[winners[i].id]){
                coins[winners[i].id] = {
                  coins: 0
                };
              }
        
            let pCoins = coins[winners[i].id].coins;
    
            coins[winners[i].id] = {
                coins: pCoins + parseInt(price)
              };
    
            fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
                if(err) cosole.log(err)
                });
 
        }
 
        for (var i = 0; i < winners.length; i++) {
            //message.channel.send("Bravo " + winners[i] + ` tu as gagné **${price}** !`);
            var loteryEmbed = new discord.RichEmbed()
            .setTitle("🏷️ **Resultat Lotery** 🏷️")
            .addField("Gagnant(s):", winners[i])
            .addField("Prix", `${price} Ecoin`)
            .setFooter("Merci a tout les participant")
            .setTimestamp()
            message.channel.send(loteryEmbed);
            console.log(`Lotery gagnée par ${winners[i]}`)
        }
    }, ms(time)) 
}

module.exports.help = {
    name: "lotery",
}