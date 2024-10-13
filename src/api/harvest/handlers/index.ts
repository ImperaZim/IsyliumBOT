import { Interaction } from 'discord.js';
import { MessageCallback } from '@types';

export async function handleCallback(
  interaction: Interaction,
  callback: MessageCallback | undefined,
  defaultMessage: string
): Promise<void> {
  if (callback) {
    await callback(interaction, defaultMessage);
  } else {
    await interaction.reply({ content: defaultMessage, ephemeral: true });
  }
}
