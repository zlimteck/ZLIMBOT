const Discord = require("discord.js");
let xp = require("../xp.json");
let coins = require("../ecoin.json");
let messages = require("../messages.json")

module.exports.run = async (client, message, args) => {

    if (args[0] === 'level'){
        let board = [];
        for(let key of Object.keys(xp)){
            let value = Object.assign({user: client.users.get(key)}, xp[key]);
            board.push(value);
        }

        board = board.filter(x => x.user);
        board = board.sort((a,b) => b.xp-a.xp).splice(0, 10);
        top = board.map((x, i) => `${i+1}  ➢ #${x.user.username}\n     Level: ${x.level.toLocaleString()} XP: ${x.xp.toLocaleString()}`).join('\n\n');
        let levelembed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setDescription(`**🆙 XP Top 10\n\n**\`\`\`📋 Rang | Pseudo\n\n${top}\`\`\``)
        .setTimestamp()
        message.channel.send(levelembed);
        message.delete().catch();

        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
        console.log(`Tableau des leaders Level demandé par ${message.author.username}`)
    }

    if(args[0] === 'ecoin'){
        let board = [];
        for(let key of Object.keys(coins)){
            let value = Object.assign({user: client.users.get(key)}, coins[key]);
            board.push(value);
        }

        board = board.filter(x => x.user);
        board = board.sort((a,b) => b.coins-a.coins).splice(0, 10);
        top = board.map((x, i) => `${i+1}  ➢ #${x.user.username}\n     Ecoin: ${x.coins.toLocaleString()}`).join('\n\n');
        let ecoinembed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setDescription(`**💴 Ecoin Top 10\n\n**\`\`\`📋 Rang | Pseudo\n\n${top}\`\`\``)
        .setTimestamp()
        message.channel.send(ecoinembed);
        message.delete().catch();

        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
        console.log(`Tableau des leaders Ecoin demandé par ${message.author.username}`)
    }

    if(args[0] === 'message'){
        let board = [];
        for(let key of Object.keys(messages)){
            let value = Object.assign({user: client.users.get(key)}, messages[key]);
            board.push(value);
        }

        board = board.filter(x => x.user);
        board = board.sort((a,b) => b.messages-a.messages).splice(0, 10);
        top = board.map((x, i) => `${i+1}  ➢ #${x.user.username}\n     Message: ${x.messages.toLocaleString()}`).join('\n\n');
        let messageembed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setDescription(`**💬 Message Top 10 \n\n**\`\`\`📋 Rang | Pseudo\n\n${top}\`\`\``)
        .setTimestamp()
        message.channel.send(messageembed);
        message.delete().catch();

        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
        console.log(`Tableau des leaders Message demandé par ${message.author.username}`)
    }
}

module.exports.help = {
    name:"leader"
}