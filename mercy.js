const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
require('dotenv').config();

const mercy = new commando.CommandoClient({
	owner: '209258844226846722',
	commandPrefix: '-',
	disableEveryone: true,
	unknownCommandResponse: true,
});

mercy
	.on('ready', () => {
		console.log(`Client ready! Logged in as ${mercy.user.username}#${mercy.user.discriminator} (${mercy.user.id})`);
		mercy.user.setActivity(`${mercy.commandPrefix}help | on ${mercy.guilds.size} servers`, { type: 'WATCHING' });
		/* setInterval(function() {
			const currentTime = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });
			console.log(currentTime);
			mercy.channels.get('594094356785266700').setName(currentTime + ' MSK');
		}, 60000);*/
	})
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});

mercy.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

mercy.registry
	.registerGroups([
		['fun', 'Fun commands'],
		['other', 'Other commands'],
		['utilities', 'Various service commands for Mercy Cat bot'],
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

mercy.login(process.env.TOKEN);