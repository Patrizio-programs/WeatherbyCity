const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf("6242686232:AAHtEY2nozGSq6jI10EhWxa_JB_59qY4YH8");

bot.start((ctx) => ctx.reply('Welcome. Enter the name of any city to receive the current weather there.'));

bot.on('text', async (ctx) => {
  const cityName = ctx.message.text;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=418b12f34f592cda6e65205b82177a99&units=metric`);
    const data = await response.json();
    console.log(data);
    const { main, description } = data.weather[0];
    const { temp, feels_like, humidity } = data.main;
    const message = `The current weather in ${cityName} is ${main} (${description}) with a temperature of ${temp}°C (feels like ${feels_like}°C) and a humidity of ${humidity}%.`;
    ctx.reply(message);
  } catch (error) {
    console.error(error);
    ctx.reply('Sorry, I could not retrieve the weather information for that city.');
  }
});

module.exports.handler = async (event, context) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { statusCode: 400 };
  }
};
