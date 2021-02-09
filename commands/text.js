const Discord = require('discord.js');
const Command = require(__approot+'/lib/Command');

module.exports = new Command('text', `Usage: PREFIX text [text (use § for spaces)] [pos1] [pos2] [width] | Generates text.`, 1, (msg, bot, ctx) => {
    let text;
    let pos1;
    let pos2;
    let width;
    let img;
    
    try {
        text = msg.args[1].split('§').join(' ');
        pos1 = msg.args[2];
        pos2 = msg.args[3];
        width = msg.args[4];
    } catch (err) {
        if (err) {
            return `Could not parse text input.`
        }
    }
    
    
    if (typeof(pos1) == 'undefined' && typeof(pos2) == 'undefined') {
        bot.drawTextWithSplitCharBasic(ctx, msg);
        img = new Discord.MessageAttachment(ctx.canvas.toBuffer(), 'canvas.png');
        return img;
    }

    console.log(text);
    if (typeof(width) == 'undefined') {
        ctx.fillText(text, pos1, pos2);
    } else {
        ctx.fillText(text, pos1, pos2, width);
    }
    
    img = new Discord.MessageAttachment(ctx.canvas.toBuffer(), 'canvas.png');
    return img;
}, 0, false);