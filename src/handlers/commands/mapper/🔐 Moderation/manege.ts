import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { CreatedGuild, SettingsController } from "@handlers";
import {
  getEmbed,
  getSelect,
  getButton,
  GlobalCollector,
  SelectInteractionTypes
} from "DiscordElementor";
import {
  ComponentType,
  ActionRowBuilder,
  ButtonInteraction,
  ApplicationCommandType,
  StringSelectMenuBuilder
} from "discord.js";

const settings = "settings";

export default new ExtendedCommand({
  name: "settings",
  description: "Server systems configuration",
  defaultMemberPermissions: "Administrator",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    if (!interaction.inCachedGuild()) return;
    const { user, guild } = interaction;

    if (new CreatedGuild(guild).checkAndAddGuild()) {
      const message = await interaction.reply({
        embeds: [
          getEmbed(settings, "loading_settings", {
            user: user.globalName || "error 404"
          })
        ],
        fetchReply: true,
      });

      loadPage("open:settings_main_menu", {
        interaction,
        message: message
      });

      new GlobalCollector({
        response: message,
        componentType: ComponentType.StringSelect,
        timeout: null,
        callback: async (select: SelectInteractionTypes) => {
          const { values } = select;
          const selected = values[0];

          switch (selected) {
            case "settings:ticket":
              select.update({ content: `A função ${selected} não está habilitada` });
              break;
            case "settings:discordlink":
              loadPage("open:discord_link_settings", {
                interaction,
                collectorResponse: select
              });
              break;
            default:
              break;
          }
        },
        filter: async (select: SelectInteractionTypes) => {
          select.user.id === interaction.user.id
        },
      });

      new GlobalCollector({
        response: message,
        componentType: ComponentType.Button,
        timeout: null,
        callback: async (button: ButtonInteraction) => {
          const { customId } = button;
          button.update({ content: `Você clicou: ${customId}` });
          return;

          switch (customId) {
            case "settings:ticket":
              button.update({ content: `A função ${selected} não está habilitada` });
              break;
            case "settings:discordlink":
              loadPage("open:discord_link_settings", {
                interaction,
                collectorResponse: button
              });
              break;
            default:
              break;
          }
        },
        filter: async (button: ButtonInteraction) => {
          button.user.id === interaction.user.id
        },
      });
    }
  }
});

interface Props {
  interaction: any,
  message?: any,
  collectorResponse?: any
}

async function loadPage(id: string, properties: Props) {
  let embeds = [];
  let components = [];
  const { user, guild } = properties.interaction;

  // add elements 
  switch (id) {
    case "open:settings_main_menu":
      embeds.push(getEmbed(settings, "settings_main_menu", {
        user: user.globalName || "error 404"
      }));
      components.push(getSelect(settings, "settings_menu"));
      break;
    case "open:discord_link_settings":
      embeds.push(getEmbed(settings, "discord_link_settings", {
        user: user.globalName || "error 404"
      }));
      components.push(getButton(settings, "discord_embed_creator"));
      components.push(getButton(settings, "discord_log_channel"));
      components.push(getButton(settings, "discord_server_manager"));
      break;
    default:
      break;
  }

  components = [new ActionRowBuilder().addComponents(...components)];

  // update interaction
  if (properties.collectorResponse) {
    properties.collectorResponse.update({
      embeds: embeds,
      components: components
    });
  } else if (properties.message) {
    properties.message.edit({
      embeds: embeds,
      components: components
    });
  }
}