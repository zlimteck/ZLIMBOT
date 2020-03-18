const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
    let avatar = bot.user.displayAvatarURL;
    let author = message.author
    let embed = new Discord.RichEmbed()
    .setAuthor("HELP")
    .setDescription("Affiche les commandes que propose ZLIMBOT")
    .setThumbnail(avatar)
    .setColor("#1AC6E1")
    .addBlankField(true)
    .addField("**LEGENDE :**", "[TIME = s/m/h/d] \
    \n [COULEUR = noir/rouge/bleu] \
    \n [LANGUE = fr/en/es/de/ru]")
    .addBlankField(true)
    .addField("❯ :robot: Commandes Users", "- ``!userinfo`` **Informations** : Donne les infos de l'user. \n- ``!xp @Username`` **Informations** : Affiche l'xp du membre demandé. \
    \n- ``!zlimbot`` **Informations** : Donne les infos de ZLIMBOT. \n- ``!server`` **Informations** : Donne les infos du serveur. \
    \n- ``!member`` **Informations** : Affiche le nombre de membres sur le serveur. \n- ``!role ROLE`` **Informations** : Affiche les infos sur le role demandé. \
    \n- ``!avatar @Username`` **Informations** : Affiche l'avatar du membre. \n- ``!icon`` **Informations** : Affiche l'icône du serveur. \
    \n- ``!emojis`` **Informations** : Affiche les emojis present sur le serveur. \n- ``!approved @Username`` **Informations** Fait une demande pour etre membre approuvé.")
    .addBlankField(true)
    .addField("❯ :cop: Commandes Administration", "- ``!tempomute @Username TIME`` **Informations** : Mute le membre le temps indiqué. \n- ``!unmute @Username`` **Informations** : Unmute le membre. \
    \n- ``!clear NUMBER`` **Informations** : Delete X message. \n- ``!say MESSAGE`` **Informations** : Le bot envoi le message. \
    \n- ``!sayinchan CHANNELID MESSAGE`` **Informations** : Le bot envoie le message dans le salon indiqué. \n- ``!mp @Username`` **Informations** : Le bot envoi un DM. \
    \n- ``!img LINK`` **Informations** : Le bot envoi une image. \n- ``!announce MESSAGE`` **Informations** : Le bot envoi une annonce. \n- ``!sondage MESSAGE`` **Informations** : Le bot envoi un sondage. \
    \n- ``!kick @Username RAISON(S)`` **Informations** : Kick le membre. \n- ``!ban @Username RAISON(S)`` **Informations** : Ban le membre. \n- ``!createrole ROLE`` **Informations** : Crée un role. \
    \n- ``!addrole @Username ROLE`` **Informations** : Ajoute le rôle au membre(s). \n- ``!removerole @Username ROLE`` **Informations** : retire le rôle au membre(s).")
    .addBlankField(true)
    .addField("❯ :gear: Utile", "- ``!report @Username RAISON(S)`` **Informations** : Report le membre. \n- ``!mpstaff MESSAGE`` **Informations** : Envoie un MP au staff. \n- ``!quote MESSAGEID CHANNELID`` **Informations** : Le bot quote le message. \
    \n- ``!hastebin MESSAGE`` **Informations** : Publie sur Hastebin et envoie l'url. \n- ``!ping`` **Informations** : Tu obtiens ton ping. \n- ``!speedtest`` **Informations** : Effectue un speedtest du serveur. \
    \n- ``!afk TIME`` **Informations** : Le bot avertie que tu es AFK. \n- ``!rappel TIME MESSAGE`` **Informations** : Lance un rappel. \n- ``!weather LOCALISATION`` **Informations** : Affiche la météo. \
    \n- ``!spotify`` **Informations** : Affiche les infos du morceau jouer sur Spotify. \n- ``!itunes RECHERCHE`` **Informations** : Effectue une recherche d'un album. \n- ``!trad MOT LANGUE`` **Informations** : Traduit le mot donné. \
    \n- ``!instagram LIEN DE PUBLICATION`` **Informations** : Affiche le post instagram.")
    .addBlankField(true)
    .addField("❯ :musical_note: Music Youtube", "- ``!youtube RECHERCHE`` **Informations** : Le bot va chercher la video sur youtube. \n- ``!yt LIEN`` **Informations** : Le bot va jouer l'audio de la video dans le channel vocal. \
    \n- ``!stop`` **Informations** : Le bot se deconnecte du channel vocal et coupe la radio.")
    .addBlankField(true)
    .addField("❯ :radio: Radio","- ``!radiolist`` **Informations** : Affiche la liste des radios disponible et la commande pour les lancer. \n- ``!stop`` **Informations** : Le bot se deconnecte du channel vocal et coupe la radio.")
    .addBlankField(true)
    .addField("❯ :tada: Fun", "- ``!chuck`` **Informations** : Quote sur Chuck Norris. \n- ``!trump`` **Informations** : Quote sur Donald Trump. \n- ``!meme`` **Informations** : Le bot envoie un meme. \
    \n- ``!metamorphe @Username`` **Informations** : Le bot va te métamorphosé.")
    .addBlankField(true)
    .addField("❯ :slot_machine: Casino", "- ``!roulette COULEUR MONTANT`` **Informations** : Le bot lance la roulette. \n- ``!slots MONTANT`` **Informations** : Le bot lance la machine a sous. \
    \n- ``!giveaway NOMBRE DE WINNERS TIME PRICE`` **Informations** : Le bot lance un giveaway. \n- ``!lotery NOMBRE DE WINNERS TIME MONTANT`` **Informations** : Le bot lance une lotery.")
    .addBlankField(true)
    .addField("❯ :underage: Nsfw", "- ``!boobs`` **Informations** : Le bot envoie une photo random de boobs. \n- ``!pussy`` **Informations** : Le bot envoie une photo random d'une pussy. \n- ``!gonewild`` **Informations** : Le bot envoie une photo random de gonewild. \
    \n- ``!hentai`` **Informations** : Le bot envoie une photo random hentai. \n- ``!porngif`` **Informations** : Le bot envoie un porngif random. \n- ``!ass``  **Informations** : Le bot envoie une photo random d'un cul. \
    \n- ``!hot`` **Informations** : Le bot envoie une photo random hot. \n- ``!young`` **Informations** : Le bot envoie une photo random d'une jeune. \n- ``!asiat`` **Informations** : Le bot envoie une photo random d'une asiat. \
    \n- ``!milf`` **Informations** : Le bot envoie une photo random d'une milf. \n- ``!old`` **Informations** : Le bot envoie une photo random d'une vieille. \n- ``!ginger`` **Informations** : Le bot envoie une photo random d'une ginger.")
    .addBlankField(true)
    .addField("❯ :credit_card: Ecoin", "- ``!ecoin`` **Informations** : Affiche ton solde d'Ecoin disponible. \n- ``!pay @Username MONTANT`` **Informations** : vire le montant d'Ecoin au membre identifié. \
    \n- ``!addecoin @Username MONTANT`` **Informations** : Ajoute des ecoin au membre sur la DB. **ONLY ADMIN**. \n- ``!removeecoin @Username MONTANT`` **Informations** : Retire des ecoin au membre sur la DB. **ONLY ADMIN**.")
    .setFooter(`Demandé par ${message.author.username}`)
	.setTimestamp()
    author.send({embed: embed});
    message.delete().catch();
}

module.exports.help = {
    name: "help"
}
