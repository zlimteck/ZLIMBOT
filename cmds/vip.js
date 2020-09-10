const Discord = require("discord.js");
let coins = require("../ecoin.json");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    
    if (args[0] == "help"){
        message.reply("Usage: ``!vip @username``");
        return;
    }

    let pCoins = coins[message.author.id].coins;
    let sCoins = coins[message.author.id].coins;
    let guild = message.channel.guild;
    let dealer = coins[guild.owner.id].coins;
    let bicon = message.author.displayAvatarURL;

    const user = message.mentions.members.first();
    const foundRole = message.guild.roles.find(role => role.name  === "VIP");

    let errornoecoin = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Erreur**")
    .setDescription(`${message.author} Tu n'as pas d'Ecoin dans ton portefeuille !`)
    .setFooter(`erreur`, bicon);
    if (!coins[message.author.id]){
        return message.channel.send(errornoecoin), console.log("Erreur role VIP: errornoecoin") , message.delete().catch();
    }

    let errornotenoughecoin = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Erreur**")
    .setDescription(`${message.author} Tu n'as pas assez d'Ecoin pour effectuer cette achat !`)
    .setFooter(`erreur`, bicon);
    if(sCoins < "1000000") return message.channel.send(errornotenoughecoin), console.log("Erreur role VIP: errornotenoughecoin") , message.delete().catch();

    let errornousername = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Erreur**")
    .setDescription(`${message.author} tu n'as pas spécifié ton @username !`)
    .setFooter(`erreur`, bicon);
    if (message.mentions.members.size < 1) return message.channel.send(errornousername), console.log("Erreur role VIP: errornousername") , message.delete().catch();

    let errornoroleVIP = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Erreur**")
    .setDescription(`${user} le ${foundRole.name} n'est pas disponible sur ce serveur !`)
    .setFooter(`erreur`, bicon);
    if (!foundRole) return message.channel.send(errornoroleVIP), console.log("Erreur role VIP: errornoroleVIP") , message.delete().catch();

    let errorhasrole = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Erreur**")
    .setDescription(`${user} tu as deja le role ${foundRole.name} !`)
    .setFooter(`erreur`, bicon);
    if (user.roles.has(foundRole.id)) return message.channel.send(errorhasrole), console.log("Erreur role VIP: errorhasrole") , message.delete().catch();

    coins[message.author.id] = {
        coins: pCoins - parseInt("1000000")
    };
    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
    });

    coins[guild.owner.id] = {
        coins: dealer + parseInt("1000000")
    };
    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
    });

    var logschannel = message.guild.channels.find(logschannel => logschannel.name === "logs");
    if (!logschannel) return console.log("Impossible de trouver le salon logs.");
    await (user.addRole(foundRole.id));
    const logembed = new Discord.RichEmbed()
    .setDescription(`Rôle: ${foundRole.name} assigné a <@${user.id}> par ${message.member}`)
    .setColor("#F8F9F9")
    .setTimestamp()
    logschannel.send(logembed);
    let obtainroleembed = new Discord.RichEmbed()
    .setTitle("**Nouveau rôle obtenu**")
    .setDescription(`Félicitations suite a ton achat tu obtiens le rôle ${foundRole.name} qui te donnes accés au channel shout-vip !`)
    .addField("Frais de l'achat:","1 000 000 ecoin")
    .setFooter(`Achat du role ${foundRole.name}`, bicon);
    user.send(obtainroleembed), console.log(`Achat du role ${foundRole.name} effectué par ${message.author.username}`) , message.delete().catch();

    let dealerembed = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Récupération des ecoin suite a l'achat du role VIP**")
    .addField("Achat:", `1 000 000 Ecoin suite a l'achat du role ${foundRole.name} par ${message.author.username}`)
    .setFooter(`Paiement`, bicon);
    guild.owner.send({embed: dealerembed});

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Ajout du role ${foundRole.name} a ${user} effectué par ${message.author.username} le ${message.createdAt}`)

};

module.exports.help = {
    name: "vip"
}