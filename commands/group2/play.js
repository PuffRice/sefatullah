const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const { YTSearcher } = require('ytsearcher'); 
const fs = require('fs'); 
const playlist = require('youtube-playlist-info');
const ytkey = "AIzaSyBBq6-Zbsq6V3PLsXCb7NCdS2TKgOoMAXQ"
const searcher = new YTSearcher({ // For searching.
	key: ytkey,
	revealkey: true
})
let queuesL = {};
let loop = {};
	function getQueueLink(server) { // Grabbed from DarkoPendragon's Music module (v1.5.1), edited to fit a queue link.
		if (!queuesL[server]) queuesL[server] = [];
		return queuesL[server];
	}
 function grabLoop(server, type) {
		if (!loop[server]) {
		loop[server] = {
			type: 0
		}
    }
			if(type) return loop[server] = {
				type: type
      }
      return loop[server];
	}
	function giveErr(err) {
	let datErrTho = err
	let giveTheErrPls = new RichEmbed()
	.setColor([179, 0, 0])
	.setTitle(`Error while executing this command!`)
	.setThumbnail(Command.user.avatarURL)
	.addField(`Type of error: ${giveTypeOfErr(err)}`, '`' + datErrTho + '`')
	.setFooter(`For more information or info on how to fix this,  go to https://discord.gg/RfmJYQX`)
	return giveTheErrPls
}
function giveTypeOfErr(err) {
	if(err.startsWith('TypeError')) {
		return 'Type'
	} else if(err.startsWith('Error')) {
		return 'Regular'
	} else if(err.startsWith('AssertionError')) {
		return 'Assertion'
	} else if(err.startsWith('EvalError')) {
		return 'Evaluation'
	} else if(err.startsWith('RangeError')) {
		return 'Range'
	} else if(err.startsWith('SyntaxError')) {
		return 'Syntax'
	} else if(err.startsWith('ReferenceError')) {
		return 'Undefined Reference'
	} else if(err.startsWith('URIError')) {
		return 'URI'
	} else {
		return 'Unknown'
	}
}
module.exports = class PlayCmd extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'group2',
            memberName: 'play',
            aliases: ['p'],
            description: 'Embeds the text you provide.',
            examples: ['embed Embeds are cool.'],
            args: [
                {
                    key: 'text',
                    prompt: 'What music would u like to play?',
                    type: 'string'
                }
            ]
        });    
    }
   run(msg,  { text }) {
   
    let argu = text.split(" ");
    
   if(!text) return msg.say('No arguments defined!')
		const httpTypes = ['http://', 'https://']
			if(httpTypes.some(ht => argu[0].includes(ht))) {
				if(text.includes('youtube.com')) return msg.say(`Hmph, This definitely isn't a YT link. Sadly I still can't play from other sources`)
				const voiceConnection = Command.voiceConnections.find(meh => meh.channel.guild.id == this.message.guild.id)
				const queul = getQueueLink(this.message.guild.id)
				ytdl.getInfo(argu[0], (err, info) => { 
				queul.push({
					url: argu[0],
					title: info.title,
					creator: info.author.name,
					requester: msg.author.tag,
					thumbnail: info.thumbnail_url,
					creator_url: info.channel_url
				})
				
					const embed = new RichEmbed()
		.setColor([0, 255, 0])
		.setThumbnail(info.thumbnail_url)
		.addField(`:thumbsup:Successfully Added to the Army of the Chosen Tracks:\n\n\n`, `[${info.title}](${text}) \nby [${info.author.name}](${info.author.channel_url})`)
		.setFooter(`Added by ${msg.author.tag}! not me`)
		msg.channel.send(embed)
		if (queul.length === 0 || !Command.voiceConnections.find(meh => meh.channel.guild.id == msg.guild.id)) execQueueLink(msg, queul);
				})
			} else {
				const queul = getQueueLink(msg.guild.id)
				if(!text) return msg.channel.send('No arguments!')
				searcher.search(argu.join(" "), { type: 'video' }).then(searchResult => {
          if (!searchResult.totalResults || searchResult.totalResults === 0) return msg.channel.send('Sorry, But I failed to get search results.:disappointed:')
		  const result = searchResult.first
			ytdl.getInfo(result.url, (err, info) => {
				queul.push({
					url: result.url,
					title: info.title,
					creator: info.author.name,
					requester: msg.author.tag,
					thumbnail: result.thumbnails.high.url,
					creator_url: info.author.channel_url
				})
				const embed = new RichEmbed()
		.setColor([0, 255, 0])
		.setThumbnail(result.thumbnails.high.url)
		.addField(`:thumbsup: Successfully added to the Army of the Chosen Tracks:\n\n\n`,`[${info.title}](${result.url}) \nby  [${info.author.name}](${info.author.channel_url})`)
		.setFooter(`Added by ${msg.author.tag}! not me`)
		msg.channel.send(embed).catch(err => {
				return giveErr(err)
			})
     console.log(PlayCmd)
		if (queul.length === 0 || !Command.voiceConnections.find(meh => meh.channel.guild.id == msg.guild.id)) execQueueLink(msg, queul);
			})
        }).catch(err => {
				return giveErr(err)
			})
			}
     function execQueueLink(msg, queul) { // Execute the queue
		if (queul.length < 0) {
			msg.channel.send('The journey of Great Music ends. Play later!:smiley:');
			// Leave the voice channel.
			const voiceConnection = Command.voiceConnections.find(meh => meh.channel.guild.id == msg.guild.id);
			if (voiceConnection !== null) return voiceConnection.disconnect();
		}
		new Promise((resolve, reject) => {
		const voiceConnection = Command.voiceConnections.find(meh => meh.channel.guild.id == msg.guild.id)
      if (voiceConnection == null) {
        if (msg.member.voiceChannel && msg.member.voiceChannel.joinable) {
          msg.member.voiceChannel.join().then(connection => {
            resolve(connection);
          }).catch((error) => {
            console.error(error);
          });
        } else if (!msg.member.voiceChannel.joinable) {
          msg.say('It\'s sad that I don\'t have permission to join you!:disappointed:')
          reject();
        } else {
          queul.splice(0, queul.length);
          reject();
        }
      } else {
        resolve(voiceConnection);
      }
    }).then(connection => {
		try {
		const embed = new RichEmbed()
		.setColor([0, 176, 244])
		.setThumbnail(queul[0].thumbnail)
		.addField(`Started Playing:notes::`, `\n\n\n[${queul[0].title}](${queul[0].url}) \nby\n [${queul[0].creator}](${queul[0].creator_url})`)
		.setFooter(`Started by ${queul[0].requester}! not me`)
		msg.say(embed)
		} catch (err) {
			return giveErr(err)
		}
		let dispatcher = connection.playStream(ytdl(queul[0].url, {filter: 'audioonly'}))
		connection.on('error', error => {
			msg.say(`Dispatcher or connection error occured: ${error}`)
			queul.shift()
		})
		
		dispatcher.on('error', error => {
			msg.say(`Dispatcher error occured: ${error}`)
			queul.shift()
		})
		
		dispatcher.on('end', () => {
			setTimeout(() => {
				let datLoopTho = grabLoop(msg.guild.id)
				let curLoop = datLoopTho.type
				if(queul.length > 1) {
					if(curLoop == 0) {
						queul.shift()
						execQueueLink(msg, queul)
					} else if(curLoop == 1) {
						execQueueLink(msg, queul)
					} else if(curLoop == 2) {
						queul.push(queul[0])
						queul.shift()
						execQueueLink(msg, queul)
					}
				} else {
					if(curLoop == 0) {
						queul.shift()
						msg.channel.send('Looks like the army is drained out and the queue is empty. I\'m Leaving....:disappointed:')
						//leave(message)
					} else if(curLoop == 1) {
						execQueueLink(msg, queul)
					} else if(curLoop == 2) {
						queul.push(queul[0])
						queul.shift()
						execQueueLink(msg, queul)
					}
				}
			}, 1000)
		})
	})
	}
		}
    
};