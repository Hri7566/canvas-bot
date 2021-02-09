module.exports = class Command {
    constructor (cmd, usage, minargs, func, minrank, hidden) {
        this.cmd = typeof(cmd) === 'object' ? cmd : [cmd];
        this.usage = typeof(usage) === 'string' ? usage : `There is no usage for ${this.cmd[0]}`;
        this.minargs = typeof(minargs) === 'number' ? minargs : 0;
        this.func = typeof(func) === 'function' ? func : (msg, bot, ctx) => {return `This command is broken.`};
        this.hidden = typeof(hidden) === 'boolean' ? hidden : false;
    }

    static getUsage(cmd, prefix) {
        return cmd.usage.split('PREFIX').join(prefix);
    }
}