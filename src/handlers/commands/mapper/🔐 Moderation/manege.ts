import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { CreatedGuild } from "@handlers"
import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  ApplicationCommandType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  ChannelType,
  ComponentType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
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
      
      }
    }
  })