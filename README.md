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

(Comprend juste l'xp, les lvl et les ecoin ainsi que l'xp sont stocker dans un .json).

# Prérequis

[![Foo](https://img.shields.io/badge/Node.js-Download-3ADC1A&?style=flat-square&logo=appveyor)](https://nodejs.org/en)
[![Foo](https://img.shields.io/badge/npm-Download-E13A18&?style=flat-square&logo=appveyor)](https://www.npmjs.com/get-npm)
[![Foo](https://img.shields.io/badge/Discord.js-Download-%232196f3&?style=flat-square&logo=appveyor)](https://discord.js.org/#/)

# Installation des modules

`npm install` pour installer la totalité des modules present dans le [package.json](https://github.com/GrimZam/GRIMBOT/blob/master/package.json)

# PM2

Installer [pm2](http://pm2.keymetrics.io/) `npm install pm2 -g` et ensuite lancer le bot via `pm2 start NOMDUBOT.js`.

# nodemon

Installer [nodemon](https://nodemon.io/) `npm install -g nodemon` et ensuite lancer le bot via `nodemon NOMDUBOT.js`.

# Follow

[![Foo](https://img.shields.io/badge/twitter-follow-blue&?style=flat-square&logo=appveyor)](https://twitter.com/JooDcrt)
