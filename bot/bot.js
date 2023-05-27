const { Telegraf } = require('telegraf');

const bot = new Telegraf("6242686232:AAHtEY2nozGSq6jI10EhWxa_JB_59qY4YH8")

bot.start((ctx) => ctx.reply('Welcome. Enter the name of any city to recieve the crrent weather there.'));

