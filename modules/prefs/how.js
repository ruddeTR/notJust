const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class howCommand extends Command {
  constructor() {
    super({
      name: 'how',
      help: 'Show preferences how to'
    })
  }

  hasPermission(message) {
    if (message.guild && message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
    // if (message.author.id == message.guild.ownerID) return true
    return false
  }

  async run(message, args, api) {

    if (!message.client.settings.get(message.guild.id)) {
      // Adding a new row to the collection uses `set(key, value)`
      message.client.settings.set(message.guild.id, message.client.defaultSettings);
    }

    let embed = new Discord.RichEmbed()
    embed.setTitle('<:apple_symbol_question:359559749882085376> `Using Preferences`')
    embed.addField('`Get Current Preferences`', 'To get current preferences, just do `.current`. \nMinimum Permission: Kick Members', false)
    embed.addField('`Setting Preferences`', 'To set a preference, just do `.set preference value`, with `preference` being the name displayed in brackets when showing current preferences, and `value` being the new value you want to set to the preference. \nMinimum Permission: Server Owner', false)

    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    //embed.setTimestamp()
    embed.setFooter('Replying to ' + message.author.tag)

    message.channel.send({
      embed
    })






    return true
  }
}

module.exports = howCommand