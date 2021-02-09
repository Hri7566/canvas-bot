const Discord = require('discord.js');
const Command = require(__approot+'/lib/Command');

module.exports = new Command(['strokerect','srect'], `Usage: PREFIX strokerect [pos1] [pos2] [width] [height] | Draw a wire rectangle.`, 4, (msg, bot, ctx) => {
    let pos1;
    let pos2;
    let pos3;
    let pos4;
    try {
        pos1 = parseFloat(msg.args[1]);
        pos2 = parseFloat(msg.args[2]);
        pos3 = parseFloat(msg.args[3]);
        pos4 = parseFloat(msg.args[4]);
    } catch (err) {
        return `Could not parse rectangle input.`;
    }

    ctx.strokeStyle = bot.settings.strokeStyle;
    ctx.fillRect(pos1, pos2, pos3, pos4);

    let img = new Discord.MessageAttachment(ctx.canvas.toBuffer(), 'canvas.png');
    return img;
}, 0, false);