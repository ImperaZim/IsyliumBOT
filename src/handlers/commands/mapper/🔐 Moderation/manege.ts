import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { CreatedGuild } from "@handlers"
import { getSelect, getEmbed, getButton } from "DiscordElementor";
import {
  ApplicationCommandType,
  ActionRowBuilder,
  Collection
} from "discord.js";

export default new ExtendedCommand({
  name: "settings",
  description: "Server systems configuration",
  defaultMemberPermissions: "Administrator",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    if (client.user === null) return;
    if (!interaction.inCachedGuild()) return;
    const username = client.user ? client.user.username : "";
    const displayAvatar = client.user
      ? client.user.displayAvatarURL() : "";
    const data = new CreatedGuild(interaction.guild).checkAndAddGuild();
    if (data) {
      const user = interaction.user;
      const embed_start = getEmbed("settings", "embed_settings", {
        user: user.globalName || "error 404",
      });
      const select_start = getSelect("settings", "select_settings");

      await interaction.reply({
        embeds: [embed_start],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([select_start])
        ],
        ephemeral: true
      });
    }
  },
  selects: new Collection([[
    "select_settings",
    async (interaction: any) => {
      const options = interaction.values[0];
      if(options === settings:discordlink){
        
      }
    }
  ]
  ])
})