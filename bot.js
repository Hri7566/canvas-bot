const Discord = require('discord.js');
const Canvas = require('canvas');
const fs = require('fs');
const Registry = require(__approot+'/lib/Registry.js');
const Command = require(__approot+'/lib/Command');

module.exports = class Bot {
    constructor (token) {
        this.token = token;
        this.client = new Discord.Client();
        this.cmds = [];
        this.listener;
        this.prefixes = ['canvas', 'c'];
        this.settings = {
            fontsize: 72,
            fontface: "Verdana",
            background: "#FFFFFF",
            fillstyle: "#000000",
            strokeStyle: "#000000"
        };
        this.defaultSettings = {
            fontsize: 72,
            fontface: "Verdana",
            background: "#FFFFFF",
            fillstyle: "#000000",
            strokeStyle: "#000000"
        };
        this.width = 1024/2;
        this.height = 1024/4;
        this.commandRegistry = new Registry();
    }

    start() {
        this.client.login(this.token);
        this.loadCommands();
        this.listen();
        console.log('Online');
    }

    loadCommands() {
        let files = fs.readdirSync(__approot+'/commands');
        files.forEach(f => {
            try {
                let cmd = require(__approot+'/commands/'+f);
                this.commandRegistry.registerItem(cmd.cmd[0], cmd);
            } catch (err) {
                console.error(err);
            }
        });
    }

    listen() {
        this.listener = this.client.on('message', msg => {
            if (typeof(msg.content) !== 'string') return;
            if (msg.content.length <= 0) return;

            msg.big_args = msg.content.split(' ');

            let hasPrefix = false;
            let usedPrefix = 'canvas';
            this.prefixes.forEach(p => {
                if (msg.big_args[0].toLowerCase() == p.toLowerCase()) {
                    hasPrefix = true;
                    usedPrefix = p;
                }
            });
            
            if (!hasPrefix) {
                return;
            }

            msg.big_ac1 = msg.content.substring(usedPrefix.length).trim();
            msg.multicmds = msg.big_ac1.split('&&');
            
            let ctx = this.newCanvas();
            let out;
            this.settings = this.defaultSettings;

            msg.multicmds.forEach(c => {
                c = c.trim();
                msg.args = c.split(' ');
                msg.ac1 = c;
                msg.cmd = msg.args[0];
                msg.argcat = c.substring(msg.cmd.length + 1).trim();
                out = this.runCommand(msg, ctx);
            });

            if (typeof(out) !== 'undefined') {
                msg.channel.send(out);
            }

            //let img = new Discord.MessageAttachment(canvas.toBuffer(), msg.argcat + '.png');
            //msg.channel.send(img);
        });
    }

    runCommand(msg, ctx) {
        if (msg.content.length >= 1024) {
            msg.channel.send('Too many characters.');
            return;
        }

        let out;

        Object.keys(this.commandRegistry.register).forEach(id => {
            let cmd = this.commandRegistry.register[id];
            cmd.cmd.forEach(c => {
                if (msg.cmd == c) {
                    console.log(`Arg length: ${msg.args.length} | Minargs: ${cmd.minargs} | Meets requirements: ${msg.args.length - 2 >= cmd.minargs}`);
                    if (msg.args.length - 1 >= cmd.minargs) {
                        out = cmd.func(msg, this, ctx);
                    } else {
                        msg.channel.send('Not enough arguments. ' + Command.getUsage(cmd, this.prefixes[0]));
                    }
                }
            })
        });

        if (typeof(out) !== 'undefined') {
            return(out);
        }
    }

    newCanvas() {
        let canvas = Canvas.createCanvas(this.width, this.height);
        let ctx = canvas.getContext('2d');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = this.settings.background;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.settings.fillstyle;

        return ctx;
    }

    drawTextFromArgcat(ctx, msg, fontface) {
        if (typeof(fontface) !== 'string') fontface = this.settings.fontface;
        ctx.fillStyle = this.settings.background;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.settings.fillstyle;
        this.settings.fontsize = 72;
        do {
            this.settings.fontsize--;
            ctx.font = this.settings.fontsize+"pt " + fontface;
        } while (ctx.measureText(msg.argcat).width > ctx.canvas.width);
        ctx.fillStyle = this.settings.fillstyle;
        ctx.fillText(msg.argcat, this.width/2, this.height/2);
    }

    drawTextWithSplitCharBasic(ctx, msg, fontface) {
        if (typeof(fontface) !== 'string') fontface = this.settings.fontface;
        // ctx.fillStyle = this.settings.background;
        // ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.settings.fillstyle;
        this.settings.fontsize = 72;
        let text = msg.args[1].split('§').join(' ');
        do {
            this.settings.fontsize--;
            ctx.font = this.settings.fontsize+"pt " + fontface;
        } while (ctx.measureText(text).width > ctx.canvas.width);
        ctx.fillStyle = this.settings.fillstyle;
        ctx.fillText(text, this.width/2, this.height/2);
    }

    drawText(ctx, text, fontface) {
        if (typeof(fontface) !== 'string') fontface = this.settings.fontface;
        ctx.fillStyle = this.settings.background;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.settings.fillstyle;
        this.settings.fontsize = 72;
        do {
            this.settings.fontsize--;
            ctx.font = this.settings.fontsize + "pt " + fontface;
        } while (ctx.measureText(text).width > ctx.canvas.width);
        ctx.fillStyle = this.settings.fillstyle;
        ctx.fillText(text, this.width/2, this.height/2);
    }

    stopListening() {
        this.listener = undefined;
    }
}