const Discord = require("discord.js");
let coins = require("../ecoin.json");
let fs = require('fs');

function isOdd(num) {
    if ((num % 2) == 0) return false;
    else if ((num % 2) == 1) return true;
}

module.exports.run = async (bot, message, args) => {

    let colour = args[0];
    let money = args[1];
    let bicon = message.author.displayAvatarURL;
    let guild = message.channel.guild;
    let dealer = coins[guild.owner.id].coins;

    if (!money) return message.channel.send("**Usage:** `!roulette COULEUR MONTANT` \nCOULEUR = Noir | Rouge | Bleu \nMONTANT = MISE ECOIN \nMise max jouable : **1000 Ecoin**\n**Informations:** Choisissez n'importe laquelle des couleurs que vous voulez ... mais certaines sont plus susceptibles que d'autres ...\n**Le noir est pour les nombres pairs**... **et rouge est pour impair**... ces deux éléments vous fourniront **2x votre montant initial**.\nPrenez un risque et choisissez **Bleu** et vous obtiendrez **20x le montant d'argent** ... mais c'est 1 chance sur 37. ");
    if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Merci d'entré un montant valide!`);
    if (money > 1000) money = 1000;
    if (args[1] > 1000) return message.channel.send(`**${message.author.username}** la mise max est de 1000 ecoin!`);
    if (coins[message.author.id].coins < money) return message.channel.send(`**${message.author.username}**, Tu ne peux pas jouer ce montant, tu n'as pas ce montant d'Ecoin!`);
    if (!colour)  return message.channel.send(`**${message.author.username}**, Vous ne pouvez parier que sur Noir (2x), Rouge (2x) ou Bleu (20x).`);
    colour = colour.toLowerCase()
    if (colour == "noir" || colour.includes("noir")) colour = 0;
    else if (colour == "rouge" || colour.includes("rouge")) colour = 1;
    else if (colour == "bleu" || colour.includes("bleu")) colour = 2;
    else return message.channel.send(`**${message.author.username}**, Vous ne pouvez parier que sur Noir (2x), Rouge (2x) ou Bleu (20x).`);

    let random = Math.floor(Math.random() * 37);

    if (random == 0 && colour == 2) {
        money *= 20
        let curBal1 = coins[message.author.id].coins
        coins[message.author.id] = {
            coins: curBal1 + parseInt(money)
        }
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
            let embed = new Discord.RichEmbed()
            .setColor("#0023FF")
            .setTitle("**🔵 Roulette 🔵**")
            .addField("Couleur misé:", args[0], true)
            .addField("Ecoin misé:", `${args[1]} Ecoin`, true)
            .addField("Numéro:", random, true)
            .addField("Tu remportes:", `${money} Ecoin`, true)
            .setImage("https://i.imgur.com/0yPKepJ.png")
            .setFooter(`${message.author.username} Tu as gagné !`, bicon);
            message.channel.send(embed);
            message.delete().catch();
            if(err) console.log(err)
            console.log(`${message.author.username} gagne ${money} ecoin en ayant misé ${args[0]} a la roulette`)
        });
    } else if (isOdd(random) && colour == 1) {
        money = money * 2
        let curBal2 = coins[message.author.id].coins
        coins[message.author.id] = {
            coins: curBal2 + parseInt(money)
        }
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
            let embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setTitle("**🔴 Roulette 🔴**")
            .addField("Couleur misé:", args[0], true)
            .addField("Ecoin misé:", `${args[1]} Ecoin`, true)
            .addField("Numéro:", random, true)
            .addField("Tu remportes:", `${money} Ecoin`, true)
            .setImage("https://i.imgur.com/0yPKepJ.png")
            .setFooter(`${message.author.username} Tu as gagné !`, bicon);
            message.channel.send(embed);
            message.delete().catch();
            if(err) console.log(err)
            console.log(`${message.author.username} gagne ${money} ecoin en ayant misé ${args[0]} a la roulette`)
        });
    } else if (!isOdd(random) && colour == 0) {
        money = money * 2
        let curBal3 = coins[message.author.id].coins
        coins[message.author.id] = {
            coins: curBal3 + parseInt(money)
        }
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
            let embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setTitle("**⚫ Roulette ⚫**")
            .addField("Couleur misé:", args[0], true)
            .addField("Ecoin misé:", `${args[1]} Ecoin`, true)
            .addField("Numéro:", random, true)
            .addField("Tu remportes:", `${money} Ecoin`, true)
            .setImage("https://i.imgur.com/0yPKepJ.png")
            .setFooter(`${message.author.username} Tu as gagné !`, bicon);
            message.channel.send(embed);
            message.delete().catch();
            if(err) console.log(err) ;
            console.log(`${message.author.username} gagne ${money} ecoin en ayant misé ${args[0]} a la roulette`)
        });
    } else {
        let curBal4 = coins[message.author.id].coins
        coins[message.author.id] = {
            coins: curBal4 - parseInt(money)
        }

        coins[guild.owner.id] = {
            coins: dealer + parseInt(money)
        }
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
            let embed = new Discord.RichEmbed()
            .setColor("#76685E")
            .setTitle("**⚫ 🔴 🔵 Roulette 🔵 🔴 ⚫**")
            .addField("Couleur misé:", args[0], true)
            .addField("Ecoin misé:", `${args[1]} Ecoin`, true)
            .addField("Numéro:", random, true)
            .addField("Tu perds:", `${money} Ecoin`, true)
            .setImage("https://i.imgur.com/VvKueSu.png")
            .setFooter(`${message.author.username} Tu as perdu!`, bicon);
            message.channel.send(embed);
            message.delete().catch();
            if(err) console.log(err)
            console.log(`${message.author.username} perd ${money} ecoin en ayant misé ${args[0]} a la roulette`)
            console.log(`${message.guild.owner} récupére la mise ${money} ecoin de ${message.author.username} suite a sa defaite a la roulette`)
        });

        let dealerembed = new Discord.RichEmbed()
        .setColor("#615755")
        .setTitle("**Récupération de mise**")
        .addField("Roulette:", `Mise de ${money} Ecoin perdu par ${message.author.username}`)
        .setFooter(`Dealer casino`, bicon);
        guild.owner.send({embed: dealerembed});

    }

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name:"roulette"
}