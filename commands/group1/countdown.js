const { Command } = require('discord.js-commando')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'countdown',
            aliases: ['cd'],
            group: 'group1',
            memberName: 'countdown',
            description: 'countdowns to whatever you give',
            args: [
                {
                    key: 'lastmsg',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg) {
        msg.delete()
        const message = await msg.say('5');
        return message.edit('4');
        message.edit('3');
        message.edit('2');
        message.edit('1');
        };
    
};