const { Telegraf } = require('telegraf');
const fs = require('fs');
const keyData = fs.readFileSync('keys.json');
const { api } = JSON.parse(keyData);
const { bot_key } = JSON.parse(keyData);

const bot = new Telegraf(bot_key)

bot.start((ctx) => ctx.reply('Welcome. Enter the name of any city to recieve the crrent weather there.'));

bot.on('text', async (ctx) => {
    const cityName = ctx.message.text;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`);
      const data = await response.json();
      console.log(data)
      const { main, description } = data.weather[0];
      const { temp, feels_like, humidity } = data.main;
      const message = `The current weather in ${cityName} is ${main} (${description}) with a temperature of ${temp}°C (feels like ${feels_like}°C) and a humidity of ${humidity}%.`;
      ctx.reply(message);
    } catch (error) {
      console.error(error);
      ctx.reply('Sorry, I could not retrieve the weather information for that city.');
    }
  });

bot.launch();