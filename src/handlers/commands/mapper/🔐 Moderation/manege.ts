import { CommandProps } from "@types";
import { client, mysql } from "@main";
import { ExtendedCommand } from "@extensions";
import { CreatedGuild, SettingsController } from "@handlers";
import {
  getModal,
  getEmbed,
  getSelect,
  getButton,
  ModalCollector,
  GlobalCollector,
  SelectInteractionTypes
} from "DiscordElementor";
import {
  ComponentType,
  ActionRowBuilder,
  ButtonInteraction,
  ModalSubmitInteraction,
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

          switch (select.customId) {
            case "settings_menu":
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
              break;
            default:
              break;
          }
        },
        filter: async (select: SelectInteractionTypes) => {
          return select.user.id === interaction.user.id;
        },
      });

      new GlobalCollector({
        response: message,
        componentType: ComponentType.Button,
        timeout: null,
        callback: async (button: ButtonInteraction) => {
          const { customId } = button;

          switch (customId) {
            case "discord_embed_creator":
              var result = await mysql.select('discord_link', 'embeds_json', [{ guildid: guild.id }]);

              if (result !== null) {
                const embedJson = result[0].embed_json;

                let defaultValue = '{\n "title": "teste"\n}';
                if (embedJson !== undefined) {
                  defaultValue = embedJson;
                }
                button.showModal(getModal("discord_embed_creator", {
                  value: defaultValue
                }));
              }

              return;
            case "discord_log_channel":
              loadPage("open:discord_logs_select", {
                interaction,
                collectorResponse: button
              });
              return;
            default:
              break;
          }

          button.update({ content: `Você clicou: ${customId}` });
        },
        filter: async (button: ButtonInteraction) => {
          return button.user.id === interaction.user.id;
        },
      });

      new ModalCollector({
        response: interaction,
        timeout: 60000,
        filter: (i) => i.user.id === interaction.user.id,
        callback: async (modal) => {
          if (modal.customId === "discord_embed_creator") {
            const text = modal.fields.getTextInputValue("embed_creator");
            console.log("Feito => " + text);
            await modal.reply({ content: "Modal recebido com sucesso!", ephemeral: true });
          }
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
    case "open:discord_logs_select":
      embeds.push(getEmbed(settings, "discord_servers_setup", {
        user: user.globalName || "error 404"
      }));
      components.push(getSelect(settings, "discord_logs_select"));
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