# ZLIMBOT

![alt text](https://i.imgur.com/GfgsBdt.jpg)

Bot Discord sous Node.js

# Token

Crée votre bot sur cette [page](https://discordapp.com/developers/applications/) recupéré votre token et copiez le dans le fichier [botsettings.json](https://github.com/GrimZam/GRIMBOT/blob/master/botsettings.json)
Example: `"token": "TOKEN",`

# Database MySQL

Ajouté les informations de votre database dans [zlimbot.js](http://git.grindhouse.xyz:8888/GrimZam/grimbot/blob/master/zlimbot.js) a la ligne 152 a 157
```
var con = mysql.createConnection({
    host: "HOSTNAME",
    user: "UTILISATEUR",
    password: "MOT DE PASSE",
    database: "NOM DE LA DB"
});
```

# Creation de la Database MySQL

```
CREATE DATABASE "NOM DE VOTRE DATABASE";
USE "NOM DE VOTRE DATABASE";
CREATE TABLE xp (id VARCHAR(30) NOT NULL, xp INT NOT NULL);
```

# Prérequis

[Node.js](https://nodejs.org/en/) [npm](https://www.npmjs.com/get-npm) [Discord.js](https://discord.js.org/#/)

# Installation des modules

`npm install` pour installer la totalité des modules present dans le [package.json](https://github.com/GrimZam/GRIMBOT/blob/master/package.json)

# PM2

Installer [pm2](http://pm2.keymetrics.io/) `npm install pm2 -g` et ensuite lancer le bot via `pm2 start NOMDUBOT.js`.

# nodemon

Installer [nodemon](https://nodemon.io/) `npm install -g nodemon` et ensuite lancer le bot via `nodemon NOMDUBOT.js`.
