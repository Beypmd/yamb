import Discord from 'discord.js';

import dotenv from 'dotenv';
import { exec } from 'child_process';

/* Commands */
import play from './api/play';
import help from './api/help';
import stop from './api/stop';
import notFound from './api/notFound';

dotenv.config();

const bot = new Discord.Client();
const prefix = process.env.PREFIX as string;

bot.on('ready', (): void => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`${prefix}help`);
});

bot.on('message', async (message): Promise<void> => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args: string[] = message.content.trim().split(' ');
  const cmd = args.shift() as string;

  switch (cmd.toLowerCase()) {
    case `${prefix}play`:
      await play(message, args);
      break;

    case `${prefix}help`:
      await help(message, args);
      break;

    case `${prefix}stop`:
      await stop(message);
      break;

    default:
      await notFound(message);
      break;
  }
});

process.on('SIGINT', (): void => {
  bot.destroy();

  process.exit(1);
});

process.on('SIGUSR2', (): void => {
  bot.destroy();

  process.exit(1);
});

bot.login(process.env.BOT_TOKEN);
