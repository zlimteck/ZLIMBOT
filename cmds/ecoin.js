const Discord = require("discord.js");
let coins = require("../ecoin.json");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author.username;

    if(!coins[message.author.id]){
      coins[message.author.id] = {
        coins: 0
      };
    }
  
    let Ecoin = coins[message.author.id].coins;
        let embed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setThumbnail("https://imgur.com/yARdHmJ.jpg")
        .addField('Solde restant:', `${Ecoin} Ecoin`)
        .setFooter(`Solde de ${message.author.username} affiché via E Corp !`)
        .setTimestamp()
        message.channel.send(embed);
        message.delete().catch();
}

module.exports.help = {
    name:"ecoin"
}