const Discord = require("discord.js");
const fs = require('fs')
let coins = require("../ecoin.json");
let shop = require("../shop.json");

module.exports.run = async (bot, message, args) => {

        let name = shop.VIP.name;
        let type = shop.VIP.type
        let price = shop.VIP.price;
        let description = shop.VIP.description
        let information = shop.VIP.information
        let embed = new Discord.RichEmbed()
        .setTitle("**SHOP**")
        .setDescription(`Boutique du serveur AFTER`)
        .setColor("#15f153")
        .addField('Item', type)
        .addField('Rôle:', name)
        .addField('Prix:', price)
        .addField('Description:', description)
        .addField('Information sur le paiement:', information)
        .setTimestamp()
        message.channel.send(embed);
        message.delete().catch();

}

module.exports.help = {
    name:"shop"
}