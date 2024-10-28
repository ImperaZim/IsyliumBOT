import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { ApplicationCommandType } from "discord.js";

export default new ExtendedCommand({
  name: "connect",
  description: "Link your account to any server.",
  defaultMemberPermissions: "Administrator",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    if (!interaction.inCachedGuild()) return;

    const { user, guild, reply } = interaction;
    
    await reply({
      content: 'comando em produção!',
      ephemeral: true
    });
  }
});
