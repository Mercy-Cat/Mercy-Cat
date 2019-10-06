const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { version } = require('../../package.json');

module.exports = class InfoCommand extends commando.Command {
	constructor(mercy) {
		super(mercy, {
			name: 'info',
			aliases: ['i', 'info', 'inf', 'information', 'about'],
			group: 'utilities',
			memberName: 'info',
			description: 'Shows bot information.',
			throttling:{
				usages: 5,
				duration: 10,
			},
		});
	}

	async run(message) {
		const mercy = this.client;
		const embed = new RichEmbed()
			.setAuthor('Mercy Cat', '', 'https://github.com/Mercy-Cat/Mercy-Cat')
			.setThumbnail(`${mercy.user.avatarURL}`)
			.setDescription(`\`Did someone call a doctor?\`\n
			My name is Mercy and I am a bot with many different useful features :)`)
			.addField('Version', `${version}`, true)
			.addField('Developer', `${mercy.owners[0].username}#${mercy.owners[0].discriminator}`, true)
			.addField('Useful links',
				'[GitHub](https://github.com/Mercy-Cat/Mercy-Cat)\n[Developer](https://github.com/ivas1ly)\n[Known issues](https://github.com/Mercy-Cat/Mercy-Cat/issues)', true)
			.addField('I\'m based on',
				'[Discord.js](https://discord.js.org) 11.5.1 stable\n[Commando](https://github.com/discordjs/Commando)\n[TheCatAPI](https://thecatapi.com/)\n[Avatar](https://vk.com/overmercy)', true)
			.setColor('#ff335c')
			.setFooter('https://github.com/Mercy-Cat/Mercy-Cat', `${mercy.user.avatarURL}`);
		message.channel.send(embed);
	}
};