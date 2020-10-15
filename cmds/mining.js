const Discord = require("discord.js");
let pick = require("../pickaxe.json");
let coins = require("../ecoin.json");
let fs = require('fs');
const ms = require('ms')
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {

    let bicon = message.author.displayAvatarURL;
    let Piocheembed = new Discord.RichEmbed()
    .setColor("#D40B25")
    .setTitle("**Pas de pioche(s)**")
    .addField("Commande:", "``!pickaxe``", true)
    .addField("Cout:", "10 000 ecoin", true)
    .setFooter(`${message.author.username}`, bicon);
    if(!pick[message.author.id]){
        pick[message.author.id] = {
            pick: 0
        }; //return message.channel.send(Piocheembed) , console.log("Commande !mining erreur : Pickaxe") , message.delete().catch();
    }

    let item = args[0];
    let moneyskull = "50000";
    let moneygold = "100000";
    let moneydiamond = "150000";
    let moneyrelic = "500000";
    let reasons = ["Tu as croisé un fantôme tu as pris peur et quitté la mine en laissant tomber ton butin!", "Il y avait un panneau de radioactivité, tu as dû rebrousser chemin!", "Tu es tombé dans une crevasse et tu as malheureusement dû sacrifier ton butin pour te sauver la vie!", "Tu as cassé ta pioche !", "Tu as donné ton butin à l'ogresse pour lui faire un bisous tellement tu étais sous son charme !"];
    var reasonschoise = reasons[Math.floor(Math.random() * reasons.length)];
    let danger = ["Sorcière(s)", "Squelette(s)", "Chauve-souris", "Démon(s)", "Gobelin(s)", "Ogresse(s)"]
    var dangerchoise = danger[Math.floor(Math.random() * danger.length)];
    let snowwhite = ["Te fais un bisou !", "Te fais un calin !", "Te fais la gueule !", "Te mouche le nez !", "T'essuie tes larmes !", "Te montre un téton !"]
    var snowwhitechoise = snowwhite[Math.floor(Math.random() * snowwhite.length)];
    let pPick = pick[message.author.id].pick;
    let icon = message.author.displayAvatarURL;

    let Usageembed = new Discord.RichEmbed()
    .setColor("#D40B25")
    .setTitle("**Usage**")
    .addField("Commande:", "``!mining ITEM``", true)
    .addField("Legende:", "ITEM : skull, coin, diamond, relic", true)
    .setFooter(`${message.author.username}`, icon);
    if (!item) return message.channel.send(Usageembed) , console.log("Commande !mining erreur : Usage") , message.delete().catch();
    let Itemembed = new Discord.RichEmbed()
    .setColor("#D40B25")
    .setTitle("**Items**")
    .addField("Items:", "skull, coin, diamond, relic.", true)
    .setFooter(`${message.author.username}`, icon);
    if (!item) return message.channel.send(Itemembed) , console.log("Commande !mining erreur : Items") , message.delete().catch();
    let Nopiocheembed = new Discord.RichEmbed()
    .setColor("#D40B25")
    .setTitle("**Pas de pioche(s)**")
    .addField("Commande:", "``!pickaxe``", true)
    .addField("Cout:", "10 000 ecoin", true)
    .setFooter(`${message.author.username}`, icon);
    if (pick[message.author.id].pick < 1) return message.channel.send(Nopiocheembed) , console.log("Commande !mining erreur : No pickaxe") , message.delete().catch();
    item = item.toLowerCase()
    if (item == "skull" || item.includes("skull")) item = 0;
    else if (item == "coin" || item.includes("coin")) item = 1;
    else if (item == "diamond" || item.includes("diamond")) item = 2;
    else if (item == "relic" || item.includes("relic")) item = 3;
    else return message.channel.send(Usageembed) , console.log("Commande !mining erreur Usage") , message.delete().catch();

    pick[message.author.id] = {
        pick: pPick - parseInt(1)
    }
    fs.writeFile("./pickaxe.json", JSON.stringify(pick), (err) => {
        if (err) cosole.log(err)
    });

    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let time = ("10m");

    let scriptembed = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**⛏️ Minage en cours ⛏️**")
    .setDescription(`Temps estimé: ${time}`)
    .addField("Cout:", "1 pioche", true)
    .addField("Pioche(s) restante:", pPick, true)
    .setImage("https://i.imgur.com/KwyR0me.gif")
    .setFooter(`${message.author.username} est dans la mine a ${args[0]}`, icon)
    message.channel.send(scriptembed).then(msg => msg.delete(ms(time)));
    console.log(`${message.author.username} est entre dans la mine a ${args[0]} | Temps estime: ${time}`)

    setTimeout(function() {
        let relicrandom = Math.floor(Math.random() * 8);
        let diamondrandom = Math.floor(Math.random() * 4);
        let coinrandom = Math.floor(Math.random() * 3);
        let skullrandom = Math.floor(Math.random() * 2);
        let danger = Math.floor(Math.random() * 20);

        if (relicrandom == 0 && item == 3) {
            let curBal1 = coins[message.author.id].coins
            coins[message.author.id] = {
                coins: curBal1 + parseInt(moneyrelic)
            }
            fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
                if (err) cosole.log(err)
                let embed = new Discord.RichEmbed()
                .setColor("#D5B271")
                .setTitle("**👑 Mine 👑**")
                .addField("Butin trouvé dans la mine", args[0], true)
                .addField("Tu remportes:", `${moneyrelic} Ecoin`, true)
                .addField(`${dangerchoise} croisé:`, `${relicrandom}`)
                .setImage("https://i.imgur.com/Oz6uHrH.gif")
                .setFooter(`Butin de ${message.author.username}`, icon)
                message.channel.send(embed);
                message.delete().catch();
                console.log(`${message.author.username} gagne ${moneyrelic} ecoin en ayant trouve une ${args[0]} dans la mine`)
            });
        } else if (diamondrandom == 3 && item == 2) {
            let curBal2 = coins[message.author.id].coins
            coins[message.author.id] = {
                coins: curBal2 + parseInt(moneydiamond)
            }
            fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
                if (err) cosole.log(err)
                let embed = new Discord.RichEmbed()
                .setColor("#09EBCD")
                .setTitle("**:gem: Mine :gem:**")
                .addField("Butin trouvé dans la mine:", args[0], true)
                .addField("Tu remportes:", `${moneydiamond} Ecoin`, true)
                .addField(`${dangerchoise} croisé:`, `${diamondrandom}`)
                .setImage("https://i.imgur.com/Oz6uHrH.gif")
                .setFooter(`Butin de ${message.author.username}`, icon)
                message.channel.send(embed);
                message.delete().catch();
                console.log(`${message.author.username} gagne ${moneydiamond} ecoin en ayant trouve un ${args[0]} dans la mine`)
            });
        } else if (coinrandom == 2 && item == 1) {
            let curBal3 = coins[message.author.id].coins
            coins[message.author.id] = {
                coins: curBal3 + parseInt(moneygold)
            }
            fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
                if (err) cosole.log(err)
                let embed = new Discord.RichEmbed()
                .setColor("#D9D716")
                .setTitle("**💰 Mine 💰**")
                .addField("Butin trouvé dans la mine:", args[0], true)
                .addField("Tu remportes:", `${moneygold} Ecoin`, true)
                .addField(`${dangerchoise} croisé:`, `${coinrandom}`)
                .setImage("https://i.imgur.com/Oz6uHrH.gif")
                .setFooter(`Butin de ${message.author.username}`, icon)
                message.channel.send(embed);
                message.delete().catch();
                console.log(`${message.author.username} gagne ${moneygold} ecoin en ayant trouve un ${args[0]} dans la mine`)
            });
        } else if (skullrandom == 1 && item == 0) {
            let curBal3 = coins[message.author.id].coins
            coins[message.author.id] = {
                coins: curBal3 + parseInt(moneyskull)
            }
            fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
                if (err) cosole.log(err)
                let embed = new Discord.RichEmbed()
                .setColor("#FDFEFE")
                .setTitle("**💀 Mine 💀**")
                .addField("Butin trouvé dans la mine:", args[0], true)
                .addField("Tu remportes:", `${moneyskull} Ecoin`, true)
                .addField(`${dangerchoise} croisé:`, `${skullrandom}`)
                .setImage("https://i.imgur.com/Oz6uHrH.gif")
                .setFooter(`Butin de ${message.author.username}`, icon)
                message.channel.send(embed);
                message.delete().catch();
                console.log(`${message.author.username} gagne ${moneyskull} ecoin en ayant trouve un ${args[0]} dans la mine`)
            });
        } else {
            let embed = new Discord.RichEmbed()
            .setColor("#76685E")
            .setTitle("**Pas de butin**")
            .addField("raison:", reasonschoise)
            .addField("butin perdu:", args[0], true)
            .addField(`${dangerchoise} croisé:`, `${danger}`, true)
            .addField(`Blanche neige:`, `${snowwhitechoise}`)
            .setImage("https://i.imgur.com/RSHfwrL.gif")
            .setFooter(`${message.author.username} a perdu son butin`, icon)
            message.channel.send(embed);
            let whitesnowembed = new Discord.RichEmbed()
            .setTitle("**Blanche Neige**")
            .setColor("#E642AA")
            .setImage("https://i.imgur.com/aCnYiGg.jpg")
            .setFooter(`${message.author.username}`, bicon);
            if (snowwhitechoise === "Te montre un téton !") return message.author.send(whitesnowembed), console.log(`Blanche neige a montré un teton a ${message.author.username}`) , message.delete().catch();
            console.log(`${message.author.username} as quittes la mine pour la raison suivante: ${reasonschoise} et perd son butin ${args[0]} dans la mine`)
            message.delete().catch();
        }

        console.log(`Commande !mining execute sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username}`)
    },ms(time))
}

module.exports.help = {
    name:"mining"
}