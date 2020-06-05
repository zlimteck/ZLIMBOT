const Discord = require("discord.js");
let pick = require("../pickaxe.json");
let coins = require("../ecoin.json");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    let pCoins = coins[message.author.id].coins;
    let sCoins = coins[message.author.id].coins;
    let pPick = pick[message.author.id].pick;
    let guild = message.channel.guild;
    let dealer = coins[guild.owner.id].coins;
    let bicon = message.author.displayAvatarURL;

    if(!pick[message.author.id]){
        pick[message.author.id] = {
            pick: 1
        };
    }

    if (!coins[message.author.id]){
        return message.reply("Tu n'as pas d'Ecoin dans ton portefeuille !")
    }

    if(sCoins < "10000") return message.reply("Tu n'as pas assez d'Ecoin pour effectuer cette achat !");

    coins[message.author.id] = {
        coins: pCoins - parseInt("10000")
    };
    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
    });

    coins[guild.owner.id] = {
        coins: dealer + parseInt("10000")
    };
    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
    });

    pick[message.author.id] = {
        pick: pPick + parseInt(1)
    };

    console.log(`${message.guild.owner} recupere 10 000 ecoin suite a l'achat d'une pioche par ${message.author.username}`);
    
    fs.writeFile("./pickaxe.json", JSON.stringify(pick), (err) => {
        if(err) cosole.log(err)
    });

    let embed = new Discord.RichEmbed()
    .setTitle("Achat réussi")
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .addField("Achat:", "Pickaxe", true)
    .addField("Prix:", `10 000 Ecoin`, true) 
    .setTimestamp()
    message.channel.send(embed);
    message.delete().catch();

    let dealerembed = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Récupération des ecoin suite a l'achat d'une pioche**")
    .addField("Achat:", `10 000 Ecoin suite a l'achat de ${message.author.username}`)
    .setFooter(`Paiement`, bicon);
    guild.owner.send(dealerembed)

    console.log(`Commande ${message.author.lastMessage} execute sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Ajout d'une pioche dans l'inventaire de ${message.author.id} le ${message.createdAt}`)
}

module.exports.help = {
    name:"pickaxe"
}