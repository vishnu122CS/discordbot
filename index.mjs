import { Client, GatewayIntentBits } from "discord.js";
import fetch from 'node-fetch';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith("create")) {
        const url = message.content.split("create")[1].trim();
        const shortUrl = await shortenUrl(url);
        return message.reply({
            content: `Generating short URL for ${url}: ${shortUrl}`,
        });
    }

    if (message.content.startsWith("joke")) {
        const joke = await getJoke();
        return message.reply({
            content: joke,
        });
    }

    message.reply({
        content: 'Hello World',
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'create') {
        const url = interaction.options.getString('url');
        const shortUrl = await shortenUrl(url);
        await interaction.reply(`Generating short URL for ${url}: ${shortUrl}`);
    } else if (commandName === 'joke') {
        const joke = await getJoke();
        await interaction.reply(joke);
    }
});

client.login('MTI1NzA4ODU0NDQ4MTIxODcxMQ.GPrJo4.hhV_RIJZ4mRJPc0H0ARCcsppFND1-iTdUmoFdE');

// Helper function to shorten URLs
async function shortenUrl(url) {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.result.short_link;
}

// Helper function to get a random joke
async function getJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    return `${joke.setup} - ${joke.punchline}`;
}
