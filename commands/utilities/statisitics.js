const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class StatCommand extends commando.Command {
	constructor(mercy) {
		super(mercy, {
			name: 'stat',
			aliases: ['s', 'stat', 'statistic', 'statistics'],
			group: 'utilities',
			memberName: 'stat',
			description: 'Shows the statistic of the Mercy Cat bot.',
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
			.setThumbnail('https://cdn.discordapp.com/avatars/580992586706190336/9957f35e34fd8917df667fadb1905d19.png?size=256')
			.setColor('#bdecb6')
			.addField('Main',
				`**Delay:** ${Math.round(mercy.ping)} ms
				**Guilds:** ${mercy.guilds.size}
				**Channels:** ${mercy.channels.size}
				**Users:** ${mercy.users.size}
				**Voice Connections:** ${mercy.voiceConnections.size}
			`, true)
			.addField('Uptime', `${Math.floor((mercy.uptime) / (1000 * 60 * 60 * 24)) % 60} days ${Math.floor((mercy.uptime / (1000 * 60 * 60)) % 60)} hours`, true)
			.setFooter('https://github.com/Mercy-Cat/Mercy-Cat 2019', 'https://cdn.discordapp.com/avatars/209258844226846722/96eacf9737a41b5dad5179a6ca4df918.png');
		message.channel.send(embed);
	}
};