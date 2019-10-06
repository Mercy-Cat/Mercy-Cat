const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const querystring = require('query-string');
const r2 = require('r2');
const CAT_API_URL = 'https://api.thecatapi.com/';
const CAT_API_KEY = process.env.CAT_API_KEY;

module.exports = class CatCommand extends commando.Command {
	constructor(mercy) {
		super(mercy, {
			name: 'cat',
			aliases: ['cat', 'cats'],
			group: 'fun',
			memberName: 'cat',
			description: 'Shows random cute cat. Meow :3',
		});
	}

	async run(message) {
		const mercy = this.client;
		try{
			const images = await this.loadImage(message.author.username);
			const image = images[0];
			console.log('message processed', 'showing image.id:', image.id);
			const embed = new RichEmbed()
				.setTitle('Cat :3')
				.setColor('RANDOM')
				.setImage(image.url)
				.setFooter('https://github.com/Mercy-Cat/Mercy-Cat', `${mercy.user.avatarURL}`);
			message.channel.send(embed);
		}
		catch(error) {
			console.log(error);
		}
	}

	async loadImage(sub_id) {
		const headers = {
			'X-API-KEY': CAT_API_KEY,
		};
		const query_params = {
			// 'has_breeds': true,
			'mime_types': 'jpg, png',
			'size': 'med',
			'sub_id': sub_id,
			'limit': 1,
		};
		let response;
		const queryString = querystring.stringify(query_params);

		try {
			const _url = CAT_API_URL + `v1/images/search?${queryString}`;
			response = await r2.get(_url, { headers }).json;
		}
		catch(e) {
			console.log(e);
		}
		return response;
	}
};