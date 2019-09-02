const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let slots = [":apple:", ":green_apple:", ":cherries:", ":strawberry:", ":lemon:"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let bicon = message.author.displayAvatarURL;

    if (slots[result1] === slots[result2] && slots[result3]) {
        let embed = new Discord.RichEmbed()
        .setTitle(':slot_machine: Machine a Sous :slot_machine:')
        .setColor("#F7BA2A")
        .setDescription('SLOTS: :apple: | :green_apple: | :cherries: | :strawberry: | :lemon: \n Il faut au minimum 2 items identique pour gagner la partie !')
        .addField('Resultat:', slots[result1] + slots[result2] + slots[result3], true)
        .setFooter(`${message.author.username} Tu as gagné!`, bicon);
        message.channel.send(embed);
        message.delete().catch();    
    } else {
        let embed = new Discord.RichEmbed()
        .setTitle(':slot_machine: Machine a Sous :slot_machine:')
        .setColor("#ff0000")
        .setDescription('SLOTS: :apple: | :green_apple: | :cherries: | :strawberry: | :lemon: \n Il faut au minimum 2 items identique pour gagner la partie !')
        .addField('Resultat', slots[result1] + slots[result2] + slots[result3], true)
        .setFooter(`${message.author.username} Tu as perdu!`, bicon);
        message.channel.send(embed);
        message.delete().catch();
    }
}

module.exports.help = {
    name: "slots"
}
