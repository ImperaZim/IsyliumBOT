import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { HarvestConnection } from "@api/harvest";
import { ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";

export default new ExtendedCommand({
  name: "connect",
  description: "Link your account to any server.",
  defaultMemberPermissions: "Administrator",
  options: [
    {
      name: "token",
      description: "Envie um token, obtenha usando /discord no minecraft",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  async run({ interaction, options }: CommandProps) {
    if (!interaction.inCachedGuild()) return;

    const { user, guild } = interaction;
    const token = options.getString("token");
    
    const data = await HarvestConnection.getPlayerByToken(token);
    const decodeData = JSON.parse(atob(data.metadata));
    
    await interaction.reply({
      ephemeral: true,
      fetchReply: true,
      content: 'comando em produção! nickname: ' + decodeData.name
    });
  }
});
