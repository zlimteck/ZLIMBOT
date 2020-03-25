const Discord = require('discord.js')

module.exports.run = (bot, message, args) => {
    var replys = [
        "En Chein ! :dog:",
        "En Chat ! :cat:",
        "En Poulet ! :chicken:",
        "En Vache ! :cow:",
        "En Lapin ! :rabbit:",
        "En Cochon ! :pig:",
        "En Licorne ! :unicorn:",
        "En Poisson ! :fish:",
        "En Araignée ! :spider:",
        "En Tortue ! :turtle:",
        "En Escargot ! :snail:",
        "En Eléphant ! :elephant:",
        "En Cerf ! :deer:",
        "En Crocodile ! :crocodile:",
        "En Dindon ! :turkey:",
        "En Gorille ! :gorilla:",
    ];

    let reponse = (replys[Math.floor(Math.random() * replys.length)])
    let target = message.mentions.users.first() || message.author;
    let embed = new Discord.RichEmbed()
    .setTitle("Métamorphe")
    .setColor("#F7BA2A")
    .addField("Le membre", `${target}#${target.discriminator}`)
    .addField("A été métamorphosé...", reponse)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "metamorphe"
}    