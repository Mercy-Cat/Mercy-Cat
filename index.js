require('dotenv').config();
// require the discord.js module
const { Client, RichEmbed } = require('discord.js');

const { prefix } = require('./config.json');
// create a new Discord client
const client = new Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('ready', () => {
	client.user.setPresence({
		game: { name: 'with discord.js' },
		status: 'online',
	});

	setInterval(function() {
		const currentTime = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });
		console.log(currentTime);
		client.channels.get('594094356785266700').setName(currentTime + ' МСК');
	}, 60000);
	console.log(`${client.user.username} is up and running on ${client.guilds.size} servers!`);
});

client.on('message', message => {
	console.log(message.content);
	if (message.content === `${prefix}mercy`) {
		// send back "I'm taking care of you, {message author}." to the channel the message was sent in
		// message.channel.send('Did someone call a doctor?');
		message.channel.send(`I'm taking care of you, ${message.author}!`);
	}
	if (message.content === '!h') {
		message.channel.send(`:wave: Hello, ${message.author}!`);
	}
	// If the message is "how to embed"
	if (message.content === `${prefix}te`) {
		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
		const embed = new RichEmbed()
		// Set the title of the field
			.setTitle('A slick little embed')
		// Set the color of the embed
			.setColor(0xFF0000)
		// Set the main content of the embed
			.setDescription('Hello, this is a slick embed!');
		// Send the embed to the same channel as the message
		message.channel.send(embed);
	}

});

// login to Discord with your app's token
client.login(process.env.TOKEN);
