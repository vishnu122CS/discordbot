const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with pong!',
    },
    {
        name: 'create',
        description: 'URL shortener',
        options: [
            {
                name: 'url',
                type: 3, 
                description: 'The URL to shorten',
                required: true,
            }
        ],
    },
    {
        name: 'joke',
        description: 'Replies with a random joke',
    },
];

const rest = new REST({ version: '10' }).setToken('MTI1NzA4ODU0NDQ4MTIxODcxMQ.GPrJo4.hhV_RIJZ4mRJPc0H0ARCcsppFND1-iTdUmoFdE');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands('1257088544481218711'),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
