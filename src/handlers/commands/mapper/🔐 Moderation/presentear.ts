import { client } from "@main";
import { CommandProps } from "@types";
import { getModal } from "DiscordElementor";
import { ExtendedCommand } from "@extensions";
import { CollectorsManager } from "@handlers";
import { ApplicationCommandType } from "discord.js";

export default new ExtendedCommand({
  name: "presentear",
  description: "Send a gift to a player.",
  defaultMemberPermissions: "Administrator",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction, options }: CommandProps) {
    if (!interaction.inCachedGuild()) return;
    try {
      const modal = await interaction.showModal(
        getModal("discord_send_gift")
      );
      CollectorsManager.registerCollectors(interaction, modal);
    } catch (error) {
      console.error("Erro ao vincular conta:", error);
      await interaction.reply({
        ephemeral: true,
        content: "Ocorreu um erro ao tentar vincular sua conta. Tente novamente mais tarde.",
      });
    }
  },
});
