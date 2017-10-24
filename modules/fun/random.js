const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

function randomN(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

class randomCommand extends Command {
	constructor() {
		super({
			name: 'random',
			help: 'Flip a coin or get a random number',
			lhelp: '[coin/number] [first number] [second number]\n[coin/number] is whether to flip a coin or get a random number\n[first number] is the bottom number to use (if you selected random number)\n[second number] is the top number to use (if you selected random number)'
		})
	}

	async run(message, args, api) {
		//message.delete()
		//api.evalembed([245, 236, 71], "🏓 `Ping Successful`", "Heartbeat", one, "Ping", two)
		args.splice(0, 1)
		var argg = args[0].toLowerCase();
		if (argg.indexOf('coin') >= 0) {
			var result = Math.floor((Math.random() * 2) + 1);
			let embed = new Discord.RichEmbed()
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setTitle('<:apple_money_bag:359560552210759681> `Coin Flipped`')
			embed.setDescription(String.fromCharCode(8203))
			embed.setColor('#00ff00')
			embed.setTimestamp()
			if (result == 1) {
				embed.addField('`Result`', 'Heads', false)
			} else if (result == 2) {
				embed.addField('`Result`', 'Tails', false)
			}
			message.channel.send({
				embed
			})
			return true
		} else if (argg.indexOf('number') >= 0) {
			var num;
			if (args[1] && !isNaN(args[1]) && args[2] && !isNaN(args[2])) {
				num = randomN(1, 100)
			} else {
				num = randomN(args[1], args[2])
			}
			let embed = new Discord.RichEmbed()
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setTitle('<:apple_symbol_numbers:372331796832190464> `Random Number Generated`')
			embed.setDescription(String.fromCharCode(8203))
			embed.setColor('#00ff00')
			embed.setTimestamp()
			embed.addField('`Result`', 'Heads', false)
			embed.addField('`Result`', 'Tails', false)
			message.channel.send({
				embed
			})
			return true
		}

	}
}

module.exports = randomCommand