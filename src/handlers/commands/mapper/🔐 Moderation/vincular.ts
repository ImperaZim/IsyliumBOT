import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { HarvestConnection, HarvestDatabaseConnection } from "@api/harvest";
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

    const tokenByPlayer = await HarvestDatabaseConnection.getUserByToken(user.username);
    const playerByToken = await HarvestDatabaseConnection.getTokenByUser(token);

    const data = await HarvestConnection.getPlayerByToken(token);
    const metadata = JSON.parse(atob(data.metadata));

    if (tokenByPlayer !== null) {
      await interaction.reply({
        ephemeral: true,
        fetchReply: true,
        content: `Você já esta conectado no servidor \"harvest\", sua conta vinculada está no nome de ${metadata.name}`
      });
      return;
    }

    if (playerByToken !== null) {
      await interaction.reply({
        ephemeral: true,
        fetchReply: true,
        content: `O token harvest ${token} já está vinculado á uma conta do discord!`
      });
      return;
    }

    await HarvestConnection.define(
      metadata.name,
      'discord_username',
      user.username
    );
    await HarvestConnection.define(
      metadata.name,
      'discord_link_status',
      true
    );
    await HarvestDatabaseConnection.setPlayerData(user.username, token);

    await interaction.reply({
      content: `O \"discord_username\" de ${metadata.name} foi definido como ${user.username}.`
    });

  }
});
