const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class StatCommand extends commando.Command {
	constructor(mercy) {
		super(mercy, {
			name: 'stat',
			aliases: ['s', 'stat', 'statistic', 'statistics'],
			group: 'utilities',
			memberName: 'stat',
			description: 'Shows the statistic.',
			throttling:{
				usages: 5,
				duration: 10,
			},
		});
	}

	async run(message) {
		const mercy = this.client;
		const embed = new RichEmbed()
			.setAuthor('Mercy Cat Stats')
			.setThumbnail(`${mercy.user.avatarURL}`)
			.setColor('#bdecb6')
			.addField('Main',
				`**Delay:** ${Math.round(mercy.ping)} ms\n**Guilds:** ${mercy.guilds.size}\n**Channels:** ${mercy.channels.size}\n**Users:** ${mercy.users.size}
				\n**Voice Connections:** ${mercy.voiceConnections.size}`, true)
			.addField('Uptime', `${Math.floor((mercy.uptime) / (1000 * 60 * 60 * 24)) % 60} days ${Math.floor((mercy.uptime / (1000 * 60 * 60)) % 60)} hours`, true)
			.setFooter('https://github.com/Mercy-Cat/Mercy-Cat', `${mercy.user.avatarURL}`);
		message.channel.send(embed);
	}
};