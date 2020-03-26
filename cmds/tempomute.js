const Discord = require("discord.js");
const ms = require("ms");
const botsettings = require("../botsettings.json");
const red = botsettings.red;

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (args[0] == "help"){
        message.reply("Usage: !tempomute <user> <1s/m/h/d>");
        return;
    }

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Impossible de trouver l'user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Je ne peux pas le(s) mute!");
    let raison = args.slice(2).join(" ");
    if (!raison) return message.reply("Tu n'as pas indiqué de raison!");
    var muterole = message.guild.roles.find(role => role.name === "MUTED");
    var userrole = message.guild.roles.find(role => role.name === "USER");
    var nsfwrole = message.guild.roles.find(role => role.name === "NSFW");
    var approvedrole = message.guild.roles.find(role => role.name === "APPROVED");

    if(!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "MUTED",
                color: "#000000",
                permissions:[]
            })

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return message.reply("Tu n'as pas spécifié de temps!");
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

    try {
        tomute.send(`<@${tomute.id}>, vous avez été muted sur le serveur **${message.guild.name}** pendant **${mutetime}** pour la raison suivante: **${raison}**. En conséquence tu perds le Role **@USERS** le temps du mute. `)
        console.log(`${tomute.id} a été mute pendant ${mutetime} sur le serveur ${message.guild.name} pour la raison suivante: ${raison}`)    
    }catch(e){
        message.channel.send(`<@${tomute.id}> a été muted du serveur **${message.guild.name}** pendant **${mutetime}** pour la raison suivante: **${raison}**. En conséquence il perd le Role **@USERS** le temps du mute. `)
        console.log(`${tomute.id} a été mute pendant ${mutetime} sur le serveur ${message.guild.name} pour la raison suivante: ${raison}`)
    }

    let muteembed = new Discord.RichEmbed()
    .setDescription(`Mute éxécuté par ${message.author}`)
    .setColor(red)
    .addField("❯ Muted User", tomute)
    .addField("❯ Muted dans", message.channel)
    .addField("❯ Moment", message.createdAt)
    .addField("❯ Temps du mute", mutetime)
    .addField("❯ Raison(s)", raison);
    var reportschannel = message.guild.channels.find(reportschannel => reportschannel.name === "reports");
    if (!reportschannel) return message.reply("Crée un salon (reports) avant.");
    reportschannel.send(muteembed);
    await (tomute.addRole(muterole.id), tomute.removeRole(userrole.id));
    await (tomute.addRole(muterole.id), tomute.removeRole(nsfwrole.id));
    await (tomute.addRole(muterole.id), tomute.removeRole(approvedrole.id));
    console.log(`${tomute.id} a perdu ses roles et obtiens le role MUTED`)
    setTimeout(function(){
        tomute.removeRole(muterole.id); console.log(`${tomute.id} a perdu le role ${muterole.id}`)
        tomute.addRole(userrole.id); console.log(`${tomute.id} a recupere le role ${userrole.id}`)
        tomute.send(`<@${tomute.id}>, vous avez été unmuted sur le serveur **${message.guild.name}** tu récupére donc le Role **@USERS**. Vous devrez cependant refaire une demande pour le role **@APPROVED** et **@NSFW**.`);
        console.log(`${tomute.id} a été unmuted du serveur ${message.guild.name}`)
    }, ms(mutetime));
}

module.exports.help = {
    name: "tempomute"
}

