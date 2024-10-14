import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";

export default new ExtendedCommand({
  name: "manage",
  description: "Gerenciar sistemas do servidor",
  defaultMemberPermissions: "Administrator",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
      if (client.user === null) return;
      if (!interaction.inCachedGuild()) return;
      const data = new GuildData(interaction.guild);
      const checkGuild = await data.checkGuildData();
      const username = client.user ? client.user.username : "";
      const displayAvatar = client.user
        ? client.user.displayAvatarURL() : "";



  }
});