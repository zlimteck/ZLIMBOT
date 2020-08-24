const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR") , console.log(`Erreur sur la commande !configserver: le membre ${message.author.username} n'a pas le role ADMINISTRATEUR`) , message.delete().catch();
    let createrole1 = "ADMINISTRATEUR"
    message.guild.createRole({
        name: createrole1,
        color: "219C73",
        permissions:["ADMINISTRATOR"]
    })

    let createrole2 = "MODERATEUR"
    message.guild.createRole({
        name: createrole2,
        color: "#138AED",
        permissions:[]
    })

    let createrole3 = "VIP"
    message.guild.createRole({
        name: createrole3,
        color: "#C741D7",
        permissions:[]
    })

    let createrole4 = "USER"
    message.guild.createRole({
        name: createrole4,
        color: "#7A0A0A",
        permissions:[]
    })

    let setrolesserverembed = new Discord.RichEmbed()
    .setTitle("**Les roles ont été crée avec succès**")
    .setDescription("Note: Ajouté vos droits au roles depuis les parametres du serveur !")
    .addField("Roles:", `${createrole1} , ${createrole2} , ${createrole3} , ${createrole4}`)
    .setTimestamp()
    message.channel.send(setrolesserverembed), console.log(`Roles ${createrole1}, ${createrole2}, ${createrole3}, ${createrole4} cree avec succes`)

    let createchannel1 = "joined_leave"
    message.guild.createChannel(createchannel1)

    let createchannel2 = "shout"
    message.guild.createChannel(createchannel2)

    let createchannel3 = "requête"
    message.guild.createChannel(createchannel3)

    let createchannel4 = "hack"
    message.guild.createChannel(createchannel4)

    let createchannel5 = "casino"
    message.guild.createChannel(createchannel5)

    let createchannel6 = "mining"
    message.guild.createChannel(createchannel6)

    let createchannel7 = "lotery"
    message.guild.createChannel(createchannel7)

    let createchannel8 = "giveaway"
    message.guild.createChannel(createchannel8)

    let createchannel9 = "nsfw"
    message.guild.createChannel(createchannel9)

    let createchannel10 = "staff-mp"
    message.guild.createChannel(createchannel10)

    let createchannel11 = "approved"
    message.guild.createChannel(createchannel11)

    let createchannel12 = "reports"
    message.guild.createChannel(createchannel12)

    let createchannel13 = "kick"
    message.guild.createChannel(createchannel13)

    let createchannel14 = "ban"
    message.guild.createChannel(createchannel14)

    let createchannel15 = "logs"
    message.guild.createChannel(createchannel15)

    let setchannelsserverembed = new Discord.RichEmbed()
    .setTitle("**Les salons ont été crée avec succès**")
    .setDescription("Note: Ajouté vos droits au Salons depuis les parametres de salons")
    .addField("Salons:", `#${createchannel1} , #${createchannel2} , #${createchannel3} , #${createchannel4} , #${createchannel5} , #${createchannel6} , #${createchannel7} , #${createchannel8} , #${createchannel9} , #${createchannel10} , #${createchannel11} , #${createchannel12} , #${createchannel13} , #${createchannel14} , #${createchannel15}`)
    .setTimestamp()
    message.channel.send(setchannelsserverembed), console.log(`Salons ${createchannel1}, ${createchannel2}, ${createchannel3}, ${createchannel4}, ${createchannel5}, ${createchannel6}, ${createchannel7}, ${createchannel8}, ${createchannel9}, ${createchannel10}, ${createchannel11}, ${createchannel12}, ${createchannel13}, ${createchannel14}, ${createchannel15} cree avec succes`) , message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} execute sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name: "configserver"
}