const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'group1',
            memberName: 'say',
            description: 'I\'ll reply with what you tell me',
            examples: ['say Hi there!'],
            args: [
                {
                    key: 'text',
                    prompt: 'You must say what I should say or else how will I say what I have to say',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, { text }) {
        return msg.say(text);
    }
};