import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { HarvestConnection } from "@api/harvest";
import { ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";

export default new ExtendedCommand({
  name: "vincular",
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
    const metadata = JSON.parse(atob(data.metadata));

    await HarvestConnection.define(
      metadata.name,
      'discord_username',
      user.username
    );
    
    const newdata = await HarvestConnection.getPlayerByToken(token);

    await interaction.reply({
      content: `O \"discord_username\" de ${metadata.name} foi definido como ${user.username}.\nNovo Metadata:\n${atob(newdata.metadata)}`
    });
  }
});
