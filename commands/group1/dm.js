const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'group1',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            examples: ['dm @User Hi there!'],
            args: [
                {
                    key: 'user',
                    prompt: 'Who do want to DM?',
                    type: 'user'
                },
                {
                    key: 'content',
                    prompt: 'What would you like to send',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, { user, content }) {
        return user.send(content);
    }
};