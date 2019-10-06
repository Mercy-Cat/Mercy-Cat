const commando = require('discord.js-commando');
const weather = require('weather-js');
const { RichEmbed } = require('discord.js');

module.exports = class WeatherCommand extends commando.Command {
	constructor(mercy) {
		super(mercy, {
			name: 'weather',
			aliases: ['w', 'weather', 'wr'],
			group: 'other',
			memberName: 'weather',
			description: 'Shows the weather in the selected location.',
			args: [
				{
					key: 'city',
					prompt: 'Enter the city or zip code to get current weather.',
					type: 'string',
					validate: text => text.length < 30,
				},
			],
			throttling:{
				usages: 5,
				duration: 10,
			},
		});
	}

	async run(message, { city }) {
		const mercy = this.client;
		weather.find({ search: city, degreeType: 'C' }, function(err, result) {
			if(err || !result.length) {
				const embed = new RichEmbed()
					.setColor('#dc143c')
					.setAuthor('Sorry, but I couldn\'t find this city :(');
				message.channel.send(embed);
				return;
			}
			const current = result[0].current;
			const location = result[0].location;
			const embed = new RichEmbed()
				.setAuthor(`Weather for ${current.observationpoint} on ${current.shortday} ${current.observationtime} ${current.date}`)
				.setDescription(`**${current.skytext}**`)
				.setThumbnail(current.imageUrl)
				.setColor('#44d2f2')
				.addField('Timezone', `UTC ${location.timezone}`, true)
				.addField('Degree Type', location.degreetype, true)
				.addField('Temperature', `${current.temperature}`, true)
				.addField('Feels like', `${current.feelslike}`, true)
				.addField('Winds', current.winddisplay, true)
				.addField('Humidity', `${current.humidity}`, true)
				.setFooter('https://github.com/Mercy-Cat/Mercy-Cat', `${mercy.user.avatarURL}`);
			message.channel.send(embed);
		});
	}
};