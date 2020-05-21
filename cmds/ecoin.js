const Discord = require("discord.js");
let coins = require("../ecoin.json");

module.exports.run = async (bot, message) => {
    let target = message.mentions.users.first() || message.author || message.author.id;

    if(!coins[target.id]){
        coins[target.id] = {
            coins: 0
        };

    }

    let Ecoin = coins[target.id].coins;
    let embed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setAuthor(target.tag, target.displayAvatarURL)
    .setThumbnail("https://imgur.com/yARdHmJ.jpg")
    .addField('Solde restant:', `${Ecoin} Ecoin`)
    .setFooter(`Solde de ${target.username} affiché via E Corp !`)
    .setTimestamp()
    message.channel.send(embed);
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Solde ecoin de ${target.username}: ${Ecoin} ecoin`)

}

module.exports.help = {
    name:"ecoin"
}