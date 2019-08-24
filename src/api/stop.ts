import { Message } from 'discord.js';

import { Bot } from '../core/BotInterface';
import { ParsedMessage } from '../core/BotCommandParser';

const stop = async (cmd: ParsedMessage, msg: Message, bot: Bot): Promise<void> => {
  bot.player.stop();

  bot.player.connection = undefined;

  bot.client.voiceConnections.forEach((connection): void => {
    connection.disconnect();

    msg.channel.send(`:mute: Disconnecting from channel: ${connection.channel.name}`);
  });
};

export default stop;
