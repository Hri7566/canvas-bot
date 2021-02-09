/**
 * 
 *  ██████╗ █████╗ ███╗   ██╗██╗   ██╗ █████╗ ███████╗    ██████╗  ██████╗ ████████╗
 * ██╔════╝██╔══██╗████╗  ██║██║   ██║██╔══██╗██╔════╝    ██╔══██╗██╔═══██╗╚══██╔══╝
 * ██║     ███████║██╔██╗ ██║██║   ██║███████║███████╗    ██████╔╝██║   ██║   ██║   
 * ██║     ██╔══██║██║╚██╗██║╚██╗ ██╔╝██╔══██║╚════██║    ██╔══██╗██║   ██║   ██║   
 * ╚██████╗██║  ██║██║ ╚████║ ╚████╔╝ ██║  ██║███████║    ██████╔╝╚██████╔╝   ██║   
 *  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝    ╚═════╝  ╚═════╝    ╚═╝   
 * 
 * If you want to run this for yourself, make a file in this folder called ".env",
 * then put "TOKEN=<discord bot token here>" in there
 * 
 * TODO LIST
 * Make commands for shapes (done rectangle, strokerect)
 * Sharding
 * Images (possibly by URL)
 * Better settings
 */

require('dotenv').config();
const path = require('path');
global.__approot = path.resolve(__dirname);
const Bot = require("./bot.js");
var bot = new Bot(process.env.TOKEN);
bot.start();
