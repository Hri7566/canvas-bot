const Discord = require('discord.js');
const Command = require(__approot+'/lib/Command');

module.exports = new Command('help', `Usage: PREFIX help [command]`, 0, (msg, bot, ctx) => {
    if (!msg.args[1]) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Canvas Help');
        Object.keys(bot.commandRegistry.register).forEach(id => {
            let cmd = bot.commandRegistry.register[id];
            if (cmd.cmd[0] == 'help') {
                embed.addField(cmd.cmd[0], Command.getUsage(cmd, bot.prefixes[0]));
            }
        });
        Object.keys(bot.commandRegistry.register).forEach(id => {
            let cmd = bot.commandRegistry.register[id];
            if (!cmd.hidden) {
                if (cmd.cmd[0] !== 'help') {
                    embed.addField(cmd.cmd[0], Command.getUsage(cmd, bot.prefixes[0]));
                }
            }
        });
        return embed;
    } else {
        let ret = `There is no help for '${msg.args[1]}'.`;
        Object.keys(bot.commandRegistry.register).forEach(id => {
            let cmd = bot.commandRegistry.register[id];
            cmd.cmd.forEach(c => {
                if (msg.args[1] == c) {
                    ret = Command.getUsage(cmd, bot.prefixes[0]);
                }
            });
        });
        return ret;
    }
}, 0, false);