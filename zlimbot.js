const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;
const host = botSettings.host;
const user = botSettings.user;
const password = botSettings.password;
const database = botSettings.database;
const bot = new Discord.Client({disableEveryone: true})
const mysql = require("mysql");
let xp = require("./xp.json");
let coins = require("./ecoin.json");
let messages = require("./messages.json");

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

bot.on ("ready", async (message) => {
    console.log(`${bot.user.username} est maintenant actif !`);
    console.log(`${bot.user.username} est connecté sur ${bot.guilds.size} serveurs !`);
    bot.user.setActivity("!help", {type: "GAME"});
    let activNum = 0;
    setInterval(function() {
        if (activNum === 0) {
            bot.user.setActivity("Bot Admin")
            activNum = 1
        } else if (activNum === 1) {
            bot.user.setActivity("!help pour obtenir les cmds")
            activNum = 0
        }
    }, 3 * 1000)
});

bot.on("message", async (message, guild, name, channel) => {
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

bot.on("guildMemberAdd", async (member, message) => {
    console.log(`Le membre ${member.id} a rejoins le serveur ${member.guild.name}.`);
    var joinedchannel = member.guild.channels.find(joinedchannel => joinedchannel.name === "joined_leave");
    let joinedchannelembed = new Discord.RichEmbed()
    .setColor("#9fb5fe")
    .setTitle("**Arrivé**")
    .setDescription(`${member} a rejoins ${member.guild.name}`)
    .setImage("https://i.imgur.com/ziEAuZV.png")
    joinedchannel.send(joinedchannelembed);
    var role = member.guild.roles.find(role => role.name === "USER");
    member.addRole(role)
    member.send(`${member} bienvenue sur ${member.guild.name} ! \nTu obtiens le rôle ${role.name}. \nTu peut demander a etre membre approuvé a l'aide la commande suivante : < !approved @TONPSEUDO > dans le salon général du serveur.`)
    console.log(`${member} obtiens le role ${role.name}`)
    if (!coins[member.id]){
        coins[member.id] = {
          coins: 0
        };
      }
    let pCoins = coins[member.id].coins;
    coins[member.id] = {
        coins: pCoins + parseInt(5000)
      };
    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
        });
        member.send(`${member} 5000 ecoin te son egalement offert par Ecorp suite a ton arrivé sur le serveur !`)
        let embed = new Discord.RichEmbed()
        .setThumbnail("https://imgur.com/yARdHmJ.jpg")
        .addField("Offre pour:", `${member}`, true)
        .addField("Montant:", `5000 Ecoin`, true) 
        .setFooter(`Offert par E Corp !`)
        .setTimestamp()
        member.send({embed: embed});

        console.log(`${member} obtiens 5000 Ecoin`)

});

bot.on("guildMemberRemove", async (member, message) => {
    console.log(`${member.id} a quitté le serveur ${member.guild.name}.`);
    var joinedchannel = member.guild.channels.find(joinedchannel => joinedchannel.name === "joined_leave");
    let leavechannelembed = new Discord.RichEmbed()
    .setColor("#566cb5")
    .setTitle("**Départ**")
    .setDescription(`${member} a quitté ${member.guild.name}`)
    .setImage("https://i.imgur.com/f1nqKfL.png")
    joinedchannel.send(leavechannelembed);
});

var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
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

function generateEcoin() {
    let min = 1;
    let max = 1;
    return Math.floor(Math.random() * (max - min + 1)) +min;
}

function generateMessages() {
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

  message.author.send(lvlup)
  console.log(`${message.author} viens de level up`)
}

fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});

con.query(`SELECT * FROM ecoin WHERE id = '${message.author.id}'`, (err, rows) => {
    if (err) throw err;
    let sql;
    if (rows.length < 1) {
        sql = `INSERT INTO ecoin (id, ecoin) VALUES ('${message.author.id}', ${generateEcoin()})`;
    } else {
        let ecoin = rows[0].ecoin;
        sql = `UPDATE ecoin SET ecoin = ${ecoin + generateEcoin()} WHERE id = '${message.author.id}'`;
    }
    con.query(sql);
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

    con.query(`SELECT * FROM messages WHERE id = '${message.author.id}'`, (err, rows) => {
        if (err) throw err;
        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO messages (id, messages) VALUES ('${message.author.id}', ${generateMessages()})`;
        } else {
            let messages = rows[0].messages;
            sql = `UPDATE messages SET messages = ${messages + generateMessages()} WHERE id = '${message.author.id}'`;
        }
        con.query(sql);
    });


if(!messages[message.author.id]){
    messages[message.author.id] = {
        messages: 0
    };
}

let messagesAmt = Math.floor(Math.random() * 1) + 1;
let baseAmt = Math.floor(Math.random() * 1) + 1;


if(messagesAmt === baseAmt){
    messages[message.author.id] = {
        messages: messages[message.author.id].messages + messagesAmt
    }
    
    fs.writeFile("./messages.json", JSON.stringify(messages), (err) => {
        if (err) console.log(err)
    });
}

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