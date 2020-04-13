const Discord = require("discord.js");
let coins = require("../ecoin.json");
let fs = require('fs');

module.exports.run = async (bot, message, args) =>  {
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            money: 0
        };
    }

    let slots = [":apple:", ":green_apple:", ":cherries:", ":strawberry:", ":lemon:"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let bicon = message.author.displayAvatarURL;
    let money = (args[0]);
    let guild = message.channel.guild;
    let dealer = coins[guild.owner.id].coins;

    if (!money) return message.channel.send("**Usage:** ``!slots MONTANT`` \n MONTANT = MISE ECOIN");
    if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Merci d'entré un montant valide !`);
    if (coins[message.author.id].coins < money) return message.channel.send(`**${message.author.username}**, Tu ne peux pas jouer ce montant, tu n'as pas ce montant d'Ecoin!`);
    if (money > 1000) money = 1000;
    if (args[0] > 1000) return message.channel.send(`**${message.author.username}** la mise max est de 1000 ecoin!`);

    if (slots[result1] === slots[result2] && slots[result3]) {
        money = money * 5
        let curBal1 = coins[message.author.id].coins;
        coins[message.author.id] = {
            coins: curBal1 + parseInt(money)
        }
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
            let embed = new Discord.RichEmbed()
            .setTitle(':slot_machine: Machine a Sous :slot_machine:')
            .setColor("#F7BA2A")
            .setDescription('SLOTS: :apple: | :green_apple: | :cherries: | :strawberry: | :lemon: \n Il faut au minimum 2 items identique a la suite pour gagner la partie !')
            .addField('Resultat:', slots[result1] + slots[result2] + slots[result3], false)
            .addField("Tu as misé:", `${args[0]} Ecoin`, true )
            .addField("Tu remportes:", `${money} Ecoin`, true)
            .setImage("https://i.imgur.com/0yPKepJ.png")
            .setFooter(`${message.author.username} Tu as gagné !`, bicon);
            message.channel.send(embed);
            message.delete().catch(); 
            console.log(`${message.author.username} gagne ${money} ecoin en ayant misé ${args[0]} a la machine a sous`)
        });
    } else {
        money = money
        let curBal2 = coins[message.author.id].coins;
        coins[message.author.id] = {
            coins: curBal2 - parseInt(money)
        }

        coins[guild.owner.id] = {
            coins: dealer + parseInt(money)
        }
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
            let embed = new Discord.RichEmbed()
            .setTitle(':slot_machine: Machine a Sous :slot_machine:')
            .setColor("#ff0000")
            .setDescription('SLOTS: :apple: | :green_apple: | :cherries: | :strawberry: | :lemon: \n Il faut au minimum 2 items identique a la suite pour gagner la partie !')
            .addField('Resultat', slots[result1] + slots[result2] + slots[result3], false)
            .addField("Tu as misé:", `${args[0]} Ecoin`, true)
            .addField("Tu perd:", `${money} Ecoin`, true)
            .setImage("https://i.imgur.com/VvKueSu.png")
            .setFooter(`${message.author.username} Tu as perdu!`, bicon);
            message.channel.send(embed);
            message.delete().catch();
            console.log(`${message.author.username} perd ${money} ecoin en ayant misé ${args[0]} a la machine a sous`)
            console.log(`${message.guild.owner} récupére la mise ${money} ecoin de ${message.author.username} suite a sa defaite a la machine a sous`)
        });

        let dealerembed = new Discord.RichEmbed()
        .setColor("#615755")
        .setTitle("**Récupération de mise**")
        .addField("Slots:", `Mise de ${money} Ecoin perdu par ${message.author.username}`)
        .setFooter(`Dealer casino`, bicon);
        guild.owner.send({embed: dealerembed});
    }

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name:"slots"
}