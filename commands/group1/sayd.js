const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sayd',
            group: 'group1',
            memberName: 'sayd',
            description: 'I\'ll say what you tell me and deleete the message so no one will know',
            examples: ['sayd Hi there!'],
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
       msg.delete();
        return msg.say(text);
    }
};