const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class startCommand extends Command {
  constructor() {
    super({
      name: 'start',
      help: 'Start inviting members to earn gold bars'/*,
      lhelp: '{user} {amount}\n{user} is the ID or ping of the user\n{amount} is the amount of gold bars'*/
    })
  }

  hasPermission(message) {
   if (message.guild && message.guild.id == '268970339948691456' && 1 == 0) return true
    return false
  }

  async run(message, args, api) {
    
    var user = message.guild.member(message.author);
    if (!message.client.currency.get(user.id)) {
      var curr = {
      amount: 0,
      invCode: '',
        converted: true
      }
      message.client.currency.set(user.id, curr);
    }
    var chan
    var chan2
    var inv
    var check = await message.client.fetchInvite(message.client.currency.get(user.id).invCode).catch(e => {console.log(e)})
    if (check && !(args[1] && user.id == '193908323911860224')) {
      api.error('You have already created an invite: `https://discord.gg/' + message.client.currency.get(user.id).invCode + '`')
      return
    } else {
      chan = message.guild.channels.find('name', 'welcome')
    chan2 = message.guild.channels.find('name', 'invites')
    inv = await chan.createInvite({maxAge:0,unique:true},'Gold Bar Invite for ' + message.author.tag)
      inv = inv.toString()
      var curr = message.client.currency.get(user.id)
      curr.invCode = inv.replace('https://discord.gg/', '')
      curr.amount = Number('50') + Number(curr.amount)
      message.client.currency.set(user.id,curr)
    }
    
    
    
    chan2.send('<:goldbar:383480100282171392> Created **Gold Bar Invite** `' + inv.replace('https://discord.gg/', '') + '` for `' + message.author.tag + '`')

      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `Gold Bar Invite Created`')
   embed.addField('User', message.author.tag, true)
   embed.addField('Invite', inv.toString(), true)
    
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })






    return true
  }
}

module.exports = startCommand
