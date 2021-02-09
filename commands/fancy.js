const Discord = require('discord.js');
const Command = require(__approot+'/lib/Command');

module.exports = new Command('fancy', `Usage: PREFIX fancy [text] | Generates fancy text.`, 1, (msg, bot, ctx) => {
    bot.drawTextFromArgcat(ctx, msg, "Precious");
    let img = new Discord.MessageAttachment(ctx.canvas.toBuffer(), 'canvas.png');
    return img;
}, 0, true);