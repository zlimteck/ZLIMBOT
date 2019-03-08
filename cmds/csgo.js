const Discord = require("discord.js");
const cheerio = require('cheerio');
var request = require('request');

module.exports.run = async (client, message, args) => {
    function getStatData(location, message , $){
        var selector = $('.stats-stat .value').eq(location).text();
        var stat_array = $.parseHTML(selector);
        var stat = 0;
        if (stat_array == null){
            message.channel.send("steamID64 invalide");
        }
        else{
            stat = stat_array[0].data;
        }
        return stat;
    }
    var UR_L = "http://csgo.tracker.network/profile/" + args[0];
    if (!args[0]){
        return message.channel.send("Veuillez entrer un steamID64 valide (Le profil ne doit pas etre en privé) \n Lien utile : https://steamidfinder.com/");
    }

    request(UR_L, function(err, resp, body){
        $ = cheerio.load(body);
        var WIN = getStatData(1, message, $);
        var GAMES = getStatData(2, message, $);
        var KILLS = getStatData(7, message, $);
        var DEATHS = getStatData(8, message, $);
        var MVP = getStatData(9, message, $);
        var HRS = getStatData(10, message, $);
        var ROUNDSPLAYED = getStatData(11, message, $);
        var ROUNDSWON = getStatData(12, message, $);
        var BS = getStatData(13, message, $);
        var BD = getStatData(14, message, $);
        var STAT = new Discord.RichEmbed()
        .setTitle("CS:GO STATS")
        .setColor("#7FC6BC")
        .setThumbnail("http://csgo.tracker.network/Images/General/logo.png")
        .addField("Win", `${WIN}%`,true)
        .addField("MVP", MVP,true)
        .addField("Total Kills", KILLS,true)
        .addField("Total Deaths", DEATHS,true)
        .addField("Total Bombs Set", BS,true)
        .addField("Total Bombs Defused", BD,true)
        .addField("Total Rounds Played", ROUNDSPLAYED,true)
        .addField("Rounds Won", ROUNDSWON,true)
        .addField("Time Played", HRS,true)
        .addField("Games Played", GAMES,true)
        .setURL(UR_L)
        message.channel.send(STAT)
        message.delete().catch();
    })
}

module.exports.help = {
    name: "csgo"
}