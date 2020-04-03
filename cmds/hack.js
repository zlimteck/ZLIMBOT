const Discord = require("discord.js");
let coins = require("../ecoin.json");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message) => {

    var userhack = message.guild.members.random();
    let hackCoins = coins[userhack.id].coins;
    let hacker = coins[message.author.id].coins;
    let bicon = message.author.displayAvatarURL;
    let guild = message.channel.guild;

    if (!coins[userhack.id]){
        coins[userhack.id] = {
          coins: 0 
        } 
      } 

      let Errorchanembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.exe**")
      .addField("Erreur:", `Tu dois etre dans le salon #hack pour exécuter cette commande !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.exe`, bicon);
      if (!message.channel.nsfw) return message.channel.send(Errorchanembed) , console.log("Erreur ToolsEcorpEcoinHack.exe") , message.delete().catch();

      let Errorauthorembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.exe**")
      .addField("Erreur:", `Je ne peux pas hack le compte de celui qui éxécute le script !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.exe`, bicon);
      if(userhack.id === message.author.id) return message.channel.send(Errorauthorembed) , console.log("Erreur ToolsEcorpEcoinHack.exe") , message.delete().catch();

      let Errorownerembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.exe**")
      .addField("Erreur:", `Erreur je ne peux pas hack le créateur du script !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.exe`, bicon);
      if (userhack.id === guild.owner.id) return message.channel.send(Errorownerembed) , console.log("Erreur ToolsEcorpEcoinHack.exe") , message.delete().catch();

      let Errorbotembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.exe**")
      .addField("Erreur:", `Erreur je ne peux pas hack un bot !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.exe`, bicon);
      if (userhack.id === bot.user.id) return message.channel.send(Errorbotembed) , console.log("Erreur ToolsEcorpEcoinHack.exe") , message.delete().catch();

      let ecoin = ["10", "100", "1000", "10000"];
      var hackecoin = ecoin[Math.floor(Math.random() * ecoin.length)];

      let ErrorEcoinembed = new Discord.RichEmbed()
      .setColor("#D40B25")
      .setTitle("**ToolsEcorpEcoinHack.exe**")
      .addField("Erreur:", `impossible de hack ${userhack} car il ne dispose pas d'assez d'ecoin !`, true)
      .setFooter(`Erreur ToolsEcorpEcoinHack.exe`, bicon);
      if(hackCoins < hackecoin) return message.channel.send(ErrorEcoinembed) , console.log("Erreur ToolsEcorpEcoinHack.exe") , message.delete().catch();

      coins[userhack.id] = {
        coins: hackCoins - parseInt(hackecoin)
      };

      coins[message.author.id] = {
          coins: hacker + parseInt(hackecoin)
      };

      let embed = new Discord.RichEmbed()
      .setColor("#615755")
      .setTitle("**👨‍💻 Hack Ecoin 👨‍💻**")
      .addField("Victime:", `${userhack}`, true)
      .addField("Ecoin hack:", `${hackecoin} ecoin`, true)
      .setImage("https://i.imgur.com/Fhe3da3.jpg")
      .setFooter(`Hack via ToolsEcorpEcoinHack.exe`, bicon);
      message.channel.send(embed);
      message.delete().catch();

      console.log(`${message.author.username} Hack ${hackecoin} ecoin du solde de ${userhack}.`)

      fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
          if (err) cosole.log(err)
      });

      let Hackerembed = new Discord.RichEmbed()
      .setColor("#615755")
      .setTitle("**Transfert Ecoin via ToolsEcorpEcoinHack.exe**")
      .addField("Hack success:", `${hackecoin} Ecoin ajouté a ton solde`)
      .setFooter(`Hack via ToolsEcorpEcoinHack.exe`, bicon);
      message.author.send({embed: Hackerembed});

      console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    }

    module.exports.help = {
        name:"hack"
    }





