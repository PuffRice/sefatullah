const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '..',
    unknownCommandResponse: false,
    owner: '440500176017424384',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Our First Command Group'],
        ['group2', 'Our Second Command Group']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in Hurray! Asuna Pro is ready');
    client.user.setActivity('Future of Asuna Beta');
    const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.asuna_commando}.glitch.me/`);
}, 280000);
});

client.login('NDc2OTYzNzk0NDUxNDMxNDM1.Dk9jiQ.Ll0-aIX-6HIe07_LjlQF-dd6Rms');