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

    const { user } = interaction;
    const token = options.getString("token");

    try {
      const [tokenByPlayer, playerByToken, data] = await Promise.all([
        HarvestDatabaseConnection.getUserByToken(user.username),
        HarvestDatabaseConnection.getTokenByUser(token),
        HarvestConnection.getPlayerByToken(token),
      ]);

      const metadata = JSON.parse(atob(data.metadata));

      if (tokenByPlayer) {
        return interaction.reply({
          ephemeral: true,
          content: `Você já está conectado no servidor "harvest" como ${metadata.name}.`,
        });
      }

      if (playerByToken) {
        return interaction.reply({
          ephemeral: true,
          content: `O token "${token}" já está vinculado a outra conta do Discord!`,
        });
      }

      await Promise.all([
        HarvestConnection.define(metadata.name, 'discord_username', user.username),
        HarvestConnection.define(metadata.name, 'discord_link_status', true),
        HarvestDatabaseConnection.setPlayerData(user.username, token),
      ]);

      await interaction.reply({
        content: `A conta "${metadata.name}" foi vinculada com o Discord "${user.username}".`,
      });
    } catch (error) {
      console.error("Erro ao vincular conta:", error);
      await interaction.reply({
        ephemeral: true,
        content: "Ocorreu um erro ao tentar vincular sua conta. Tente novamente mais tarde.",
      });
    }
  },
});
