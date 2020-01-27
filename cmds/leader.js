const Discord = require("discord.js");
let xp = require("../xp.json");
let coins = require("../ecoin.json");

module.exports.run = async (client, message, args) => {

    if(args[0] === 'level') {
        let board = [];
        for(let key of Object.keys(xp)){
          let value = Object.assign({user: client.users.get(key)}, xp[key]);
          board.push(value);
        }
        
        board = board.filter(x => x.user);
        board = board.sort((a,b) => b.xp-a.xp).splice(0, 10);
        top = board.map((x, i) => `[${i+1}]  ➢ #${x.user.username}\n     Level: ${x.level.toLocaleString()} XP: ${x.xp.toLocaleString()}`).join('\n\n');
        let embed = new Discord.RichEmbed()
        .setColor("#15f153") 
        .setDescription(`**🆙 | Top 10 XP\n\n**\`\`\`📋 Rank | Username\n\n${top}\`\`\``)
        .setTimestamp()
        message.channel.send(embed);
        message.delete().catch();
       }

       if(args[0] === 'ecoin') {
        let board = [];
    for(let key of Object.keys(coins)){
      let value = Object.assign({user: client.users.get(key)}, coins[key]);
      board.push(value);
    }
    
    board = board.filter(x => x.user);
    board = board.sort((a,b) => b.coins-a.coins).splice(0, 10);
    top = board.map((x, i) => `[${i+1}]  ➢ #${x.user.username}\n     Ecoin: ${x.coins.toLocaleString()}`).join('\n\n');
    let embed = new Discord.RichEmbed()
    .setColor("#15f153") 
    .setDescription(`**💴 | Top 10 Ecoin\n\n**\`\`\`📋 Rank | Username\n\n${top}\`\`\``)
    .setTimestamp()
    message.channel.send(embed);
    message.delete().catch();

}

}
module.exports.help = {
  name:"leader"
}