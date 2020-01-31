const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true})
const mysql = require("mysql");
let xp = require("./xp.json");
let coins = require("./ecoin.json");

bot.commands = new Discord.Collection();

fs.readdir("./cmds/",(err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0){
        console.log("Aucune commande(s) à charger.");
        return;
    }
    
    console.log(`Chargement de ${jsfiles.length} commandes dans cmds !`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded !`)
        bot.commands.set(props.help.name, props);
    });
});

fs.readdir("./radios/",(err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0){
        console.log("Aucune commande(s) à charger.");
        return;
    }

    console.log(`Chargement de ${jsfiles.length} commandes dans radios !`)

    jsfiles.forEach((f, i) => {
        let props = require(`./radios/${f}`);
        console.log(`${i + 1}: ${f} loaded !`)
        bot.commands.set(props.help.name, props);
    });
});

bot.on ("ready", async () => {
    bot.user.setPresence({ game: { name: "!help | Bot Admin", type: 0} });
    console.log(`${bot.user.username} est connecté sur ${bot.guilds.size} serveurs!`);
    console.log(bot.commands);

    bot.on ("ready", async bot => {
        console.log(`GRIMBOT est maintenant actif!`);
    });
});

bot.on("message", async (message) => {
    if (!message.guild) return;
    if (!message.content) return;
    var logschannel = message.guild.channels.find(logschannel => logschannel.name === "logs")
    if (!logschannel) {
        return console.log(`[WARN]: Le salon logs n'existe pas sur ce serveur: '${message.guild.name}'`)
    }

    if (message.attachments.size > 0) {
        var Attachment = (message.attachments).array();
        Attachment.forEach(function(attachment){
            const logembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(`Image envoyé par **${message.author.tag}** dans le salon **<#${message.channel.id}>**`)
            .setColor("#15E8CC")
            .addField("Message:", `${message.content}`)
            .setImage(attachment.proxyURL)
            .setTimestamp()
            logschannel.send(logembed);
            console.log(attachment.proxyURL);
        }) 
    }else {
        const logembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`Message envoyé par **${message.author.tag}** dans le salon **<#${message.channel.id}>**`)
        .setColor("#15E8CC")
        .addField("Message:", `${message.content}`)
        .setTimestamp()
        logschannel.send(logembed);
    }
});

bot.on("messageDelete", async (message) => {
    if (!message.guild) return;
    if (!message.content) return;
    var logschannel = message.guild.channels.find(logschannel => logschannel.name === "logs")
    if (!logschannel) {
        return console.log(`[WARN]: Le salon logs n'existe pas sur ce serveur: '${message.guild.name}'`)
    }

    if (message.attachments.size > 0) {
        var Attachment = (message.attachments).array();
        Attachment.forEach(function(attachment) {
            const logembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(`Image de **${message.author.tag}** supprimé dans le salon **<#${message.channel.id}>**`)
            .setColor("#D50A0A")
            .addField("Message:", `${message.content}`)
            .setImage(attachment.proxyURL)
            .setTimestamp()
            logschannel.send(logembed)
            console.log(attachment.proxyURL);
        })
    }else {
        const logembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`Message de **${message.author.tag}** supprimé dans le salon **<#${message.channel.id}>**`)
        .setColor("#D50A0A")
        .addField("Message:", `${message.content}`)
        .setTimestamp()
        logschannel.send(logembed);
    }
});

bot.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return;
    var logschannel = oldMessage.guild.channels.find(logschannel => logschannel.name === "logs")
    if (!logschannel) {
        return console.log(`[WARN]: Le salon logs n'existe pas sur ce serveur: '${message.guild.name}'`)
    }

    const logembed = new Discord.RichEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL)
    .setDescription(`Message édité par **${oldMessage.author.tag}** dans le salon **<#${oldMessage.channel.id}>**`)
    .setColor("#E96F12")
    .addField("Ancien message:", `${oldMessage.content}`)
    .addField(`Nouveau message:`,`${newMessage.content}`)
    .setTimestamp()
    logschannel.send(logembed);
});

bot.on("guildMemberAdd", async (member, message, args, bot, channels) => {
    console.log(`${member.id} a rejoins le serveur.`);
    var joinedchannel = member.guild.channels.find(joinedchannel => joinedchannel.name === "joined_leave");
    joinedchannel.send(`:eyes: Hey regardez ${member} a rejoins le serveur! :slight_smile:`);
    var role = member.guild.roles.find(role => role.name === "USER");
    member.addRole(role)
    member.send(`${member} bienvenue sur notre serveur Discord ! \nTu obtiens le rôle ${role.name}. \nTu peut demander a etre membre approuvé a l'aide la commande suivante : < !approved @TONPSEUDO > dans le salon général du serveur.`)
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} a quitté le serveur.`);
    var joinedchannel = member.guild.channels.find(joinedchannel => joinedchannel.name === "joined_leave");
    joinedchannel.send(`:eyes: Hey regardez ${member} a quitté le serveur! :cry:`);
});

var con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "zlimbot"
});

con.connect(err => {
    if (err) throw err;
    console.log("Connecté a la database !")
});

function generateXp() {
    let min = 1;
    let max = 1;
    return Math.floor(Math.random() * (max - min + 1)) +min;
}

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
        if (err) throw err;
        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`;
        } else {
            let xp = rows[0].xp;
            sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
        }
        con.query(sql);
    });

let min = 1;
let max = 1;
let xpAdd = Math.floor(Math.random() * (max - min + 1)) +min;

if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
  };
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 500;
xp[message.author.id].xp =  curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
  xp[message.author.id].level = curlvl + 1;
  let lvlup = new Discord.RichEmbed()
  .setTitle("Level Up!")
  .setThumbnail(message.author.displayAvatarURL)
  .setColor("#15f153")
  .addField("Félicitation", `${message.author} tu viens de level up`, true)
  .addField("Level :", curlvl + 1)
  .addField("Total Xp :", curxp);

  message.channel.send(lvlup)
}

// NOT STABLE FIX SOON !!

//if (curlvl <= xp[message.author.id].level) {
//    xp[message.author.id].level * 5;
  
//    let addrankup = message.member;
//    let vipmember = message.guild.roles.find(`name`, "VIP");
//    addrankup.addRole(vipmember.id).catch(console.error);
//    message.channel.send(`Félicitations tu as atteint le level 5 tu obtiens donc le rôle VIP qui te donnes accés au channel shout-vip !`)
//    var logschannel = message.guild.channels.find(logschannel => logschannel.name === "logs");
//    if (!logschannel) return message.channel.send("Impossible de trouver le salon logs.");
//    await (addrankup.addRole(vipmember.id));
//    const logembed = new Discord.RichEmbed()
//    .setDescription(`Rôle: ${vipmember.name} assigné a ${message.member} par ZLIMBOT`)
//    .setColor("#F8F9F9")
//    .setTimestamp()
//    logschannel.send(logembed);
//}

fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});

if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 1) + 1;
  let baseAmt = Math.floor(Math.random() * 1) + 1;

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
    });
}

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if (!command.startsWith(botSettings.prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args, con);
});

bot.on('error', console.error);

bot.login(botSettings.token);
