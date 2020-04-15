const Discord = require("discord.js");
let coins = require("../ecoin.json");
const fs = require("fs");
const ms = require('ms')
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message) => {

    var userhack = message.guild.members.random();
    if(!coins[userhack.id]){
      coins[userhack.id] = {
        coins: 1
      };
    }

    let icon = message.author.displayAvatarURL;
    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let time = ("1m");

    let scriptembed = new Discord.RichEmbed()
    .setColor("#615755")
    .setTitle("**Processus ToolsEcorpEcoinHack.js en cours d'éxécution**")
    .setDescription(`Temps estimé: ${time}`)
    .setImage("https://i.imgur.com/lxrV4Zv.gif")
    .setFooter(`Hack via ToolsEcorpEcoinHack.js`, icon)
    message.channel.send(scriptembed).then(msg => msg.delete(ms(time)));
    console.log(`${message.author.username} a lancé un processus de hack | Temps estimé: ${time}`)

    setTimeout(function() {

      let hackCoins = coins[userhack.id].coins;
      let hacker = coins[message.author.id].coins;
      let bicon = message.author.displayAvatarURL;
      let guild = message.channel.guild;
      let dealer = coins[guild.owner.id].coins;
      let Errorchanembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.js**")
      .addField("Erreur:", `Tu dois etre dans le salon #hack pour exécuter cette commande !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.js`, bicon);
      if (!message.channel.nsfw) return message.channel.send(Errorchanembed) , console.log("Erreur ToolsEcorpEcoinHack.js") , message.delete().catch();

      let Errorbotembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.js**")
      .addField("Erreur:", `Impossible de hack ${userhack} !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.js`, bicon);
      if (userhack.id === bot.user.id) return message.channel.send(Errorbotembed) , console.log("Erreur ToolsEcorpEcoinHack.js") , message.delete().catch();

      let Errorauthorembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.js**")
      .addField("Erreur:", `Impossible de hack le compte de celui qui éxécute le script !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.js`, bicon);
      if(userhack.id === message.author.id) return message.channel.send(Errorauthorembed) , console.log("Erreur ToolsEcorpEcoinHack.js") , message.delete().catch();

      let Errorownerembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.js**")
      .addField("Erreur:", `Impossible de hack le créateur du script !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.js`, bicon);
      if (userhack.id === guild.owner.id) return message.channel.send(Errorownerembed) , console.log("Erreur ToolsEcorpEcoinHack.js") , message.delete().catch();

      let ecoin = ["10", "100", "1000", "10000"];
      var hackecoin = ecoin[Math.floor(Math.random() * ecoin.length)];
      let costsprice = ["1", "5", "10"];
      var coststransaction = costsprice[Math.floor(Math.random() * costsprice.length)];

      let ErrorEcoinembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.js**")
      .addField("Erreur:", `Impossible de hack ${userhack} car il ne dispose pas d'assez d'ecoin !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.js`, bicon);
      if(hackCoins < hackecoin) return message.channel.send(ErrorEcoinembed) , console.log("Erreur ToolsEcorpEcoinHack.js") , message.delete().catch();

      coins[userhack.id] = {
        coins: hackCoins - parseInt(hackecoin)
      };

      coins[message.author.id] = {
        coins: hacker + parseInt(hackecoin) - parseInt (coststransaction)
      };

      coins[guild.owner.id] = {
        coins: dealer + parseInt (coststransaction)
      };

      let embed = new Discord.RichEmbed()
      .setColor("#615755")
      .setTitle("**👨‍💻 Hack Ecoin 👨‍💻**")
      .addField("Victime:", `${userhack}`, true)
      .addField("Ecoin hack:", `${hackecoin} ecoin`, true)
      .addField("Frais de transaction:", `${coststransaction} ecoin`)
      .setImage("https://i.imgur.com/Fhe3da3.jpg")
      .setFooter(`Hack via ToolsEcorpEcoinHack.js`, bicon);
      message.channel.send(embed);
      message.delete().catch();

      console.log(`${message.author.username} Hack ${hackecoin} ecoin du solde de ${userhack} Frais de transaction : ${coststransaction}.`)
      console.log(`${message.guild.owner} récupére les frais de transfert : ${coststransaction} ecoin.`)

      fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
        if (err) cosole.log(err)
      });

      let Userhackembed = new Discord.RichEmbed()
      .setColor("#615755")
      .setTitle("**Hack de votre solde Ecoin**")
      .addField("Activité suspecte:", `Hack de ${hackecoin} Ecoin`)
      .setFooter(`Activité suspecte effectué via ToolsEcorpEcoinHack.js détecté par E corp`, bicon);
      userhack.send({embed: Userhackembed});

      let Hackerembed = new Discord.RichEmbed()
      .setColor("#615755")
      .setTitle("**Transfert Ecoin via ToolsEcorpEcoinHack.js**")
      .addField("Hack success:", `${hackecoin} Ecoin ajouté a ton solde`)
      .setFooter(`Hack via ToolsEcorpEcoinHack.js`, bicon);
      message.author.send({embed: Hackerembed});

      let coststransactionerembed = new Discord.RichEmbed()
      .setColor("#615755")
      .setTitle("**Frais de Transfert Ecoin suite a ton hack via ToolsEcorpEcoinHack.js**")
      .addField("Frais de transaction:", `${coststransaction} Ecoin`)
      .setFooter(`ToolsEcorpEcoinHack.js`, bicon);
      message.author.send({embed: coststransactionerembed});

      let dealerembed = new Discord.RichEmbed()
      .setColor("#615755")
      .setTitle("**Récupération des frais de Transfert d'un hack via ToolsEcorpEcoinHack.js**")
      .addField("Hack:", `Frais de ${coststransaction} Ecoin suite au hack de ${message.author.username} victime : ${userhack}`)
      .setFooter(`Frais de transfert via ToolsEcorpEcoinHack.js`, bicon);
      guild.owner.send({embed: dealerembed});

      console.log(`Commande !hack executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username}`)
    },ms(time))
  }

  module.exports.help = {
    name:"hack"
  }