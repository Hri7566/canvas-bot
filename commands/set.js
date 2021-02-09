const Discord = require('discord.js');
const Command = require(__approot+'/lib/Command');

module.exports = new Command('set', `Usage: PREFIX set [setting] [value] | Change settings like fontface and fillstyle.`, 0, (msg, bot, ctx) => {
    let sethelp = `Settings: background | fillstyle | strokestyle | fontface`;
    console.log(msg.args.length);
    if (msg.args.length < 3) {
        console.log('got here');
        return sethelp;
    }
    let set = msg.args[1].toLowerCase();
    let value = msg.argcat.substring(set.length + 1).trim();
    let ret;
    console.log(set);
    console.log(value);
    switch (set) {
        case "fontface":
        case "font":
        case "typeface":
        case "tf":
        case "ttf":
            try {
                bot.settings.fontface = value;
            } catch (err) {
                if (err) {
                    console.error(err);
                    return `Error parsing new value.`
                }
            }
            break;
        case "fillstyle":
        case "color":
        case "foreground":
        case "fg":
            try {
                bot.settings.fillstyle = value;
            } catch (err) {
                if (err) {
                    console.error(err);
                    return `Error parsing new value.`
                }
            }
            break;
        case "strokestyle":
        case "stroke":
        case "color":
        case "foreground":
        case "fg":
            try {
                bot.settings.strokestyle = value;
            } catch (err) {
                if (err) {
                    console.error(err);
                    return `Error parsing new value.`
                }
            }
            break;
        case "background":
        case "bg":
            try {
                bot.settings.background = value;
            } catch (err) {
                if (err) {
                    console.error(err);
                    return `Error parsing new value.`
                }
            }
            break;
        default:
            return sethelp;
            break;
    }
    // bot.drawText(ctx, bot.settings.fontface);
    let img = new Discord.MessageAttachment(ctx.canvas.toBuffer(), 'canvas.png');
    return img;
}, 0, false);