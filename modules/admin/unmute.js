const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class unmuteCommand extends Command {
	constructor() {
		super({
			name: 'unmute',
			help: 'Unmute a muted user',
			lhelp: '{user} [reason]\n{user} is the user to unmute (id or mention)\n[reason] is the Audit Log reason for the unmute'
		})
	}

	hasPermission(message) {
		//if (message.author.id == require('../../config.json').owner) return true
		if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
		return false
	}

	async run(message, args, api) {
		const thisConf = message.client.settings.get(message.guild.id);
		args.splice(0, 1)
		if (!args[0]) {
			api.error('Please specify which user to unmute.')
		}
		var arg = args[0]
		var user = api.getUser(arg, 'member')
		if (user.user.id == message.author.id) {
			api.error('You can\'t unmute yourself!')
			return
		}
		args.splice(0, 1)
		var role
		if (thisConf) {
			if (thisConf.muteRole) {
				role = message.guild.roles.find("name", thisConf.muteRole);
			}
		}
		if (role) {
			var reason
			if (args[0]) {
				reason = args.join(' ');
				user.removeRole(role, reason)
			} else {
				user.removeRole(role)
			}
			let embed = new Discord.RichEmbed()
			embed.setTitle('<:apple_muted:372902540393709569> `Unmuted ' + user.user.username + '`')
			embed.setDescription(String.fromCharCode(8203))
			embed.setColor('#00ff00')
			if (reason) {
				embed.addField('`Reason`', reason, false)
			}
			//embed.setTimestamp()
			embed.setFooter('Replying to ' + message.author.tag)

			message.channel.send({
				embed
			})
		} else {
			api.error('This server\'s mute role is invalid, non existent, or couldn\'t be found. Please check your preferences.')
		}
		return true
	}
}

module.exports = muteCommand