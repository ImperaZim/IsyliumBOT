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

// PageManager class to handle different pages
class PageManager {
  private static settings = "settings";

  static async loadPage(id: string, properties: Props) {
    let embeds = [];
    let components = [];
    const { user } = properties.interaction;

    switch (id) {
      case "open:settings_main_menu":
        embeds.push(
          getEmbed(this.settings, "settings_main_menu", {
            user: user.globalName || "error 404",
          })
        );
        components.push(getSelect(this.settings, "settings_menu"));
        break;

      case "open:discord_logs_select":
        embeds.push(
          getEmbed(this.settings, "discord_servers_setup", {
            user: user.globalName || "error 404",
          })
        );
        components.push(getSelect(this.settings, "discord_logs_select"));
        break;

      case "open:discord_link_settings":
        embeds.push(
          getEmbed(this.settings, "discord_link_settings", {
            user: user.globalName || "error 404",
          })
        );
        components.push(getButton(this.settings, "discord_embed_creator"));
        components.push(getButton(this.settings, "discord_log_channel"));
        components.push(getButton(this.settings, "discord_server_manager"));
        break;

      default:
        break;
    }

    components = [new ActionRowBuilder().addComponents(...components)];

    if (properties.collectorResponse) {
      properties.collectorResponse.update({
        embeds: embeds,
        components: components,
      });
    } else if (properties.message) {
      properties.message.edit({
        embeds: embeds,
        components: components,
      });
    }
  }
}

// CollectorsManager class to manage all collector types
class CollectorsManager {
  static registerCollectors(interaction: CommandProps, message: any) {
    this.registerGlobalCollector(interaction, message);
    this.registerButtonCollector(interaction, message);
    this.registerModalCollector(interaction);
  }

  private static registerGlobalCollector(
    interaction: CommandProps,
    message: any
  ) {
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
                PageManager.loadPage("open:discord_link_settings", {
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
      componentType: ComponentType.ChannelSelect,
      timeout: null,
      callback: async (select: SelectInteractionTypes) => {
        const { values } = select;
        const selected = values[0];

        switch (select.customId) {
          case "discord_logs_select":
            console.log(selected);
            PageManager.loadPage("open:discord_link_settings", {
              interaction,
              collectorResponse: select
            });
            break;
          default:
            break;
        }
      },
      filter: async (select: SelectInteractionTypes) => {
        return select.user.id === interaction.user.id;
      },
    });
  }

  private static registerButtonCollector(
    interaction: CommandProps,
    message: any
  ) {
    new GlobalCollector({
      response: message,
      componentType: ComponentType.Button,
      timeout: null,
      callback: async (button: ButtonInteraction) => {
        const { customId } = button;

        switch (customId) {
          case "discord_embed_creator":
            const result = await mysql.select("discord_link", "embeds_json", [
              { guildid: interaction.guild.id },
            ]);

            if (result !== null) {
              const embedJson = result[0].embed_json || `{\n "title": "teste"\n}`;
              button.showModal(
                getModal("discord_embed_creator", { value: embedJson })
              );
            }
            return;
          case "discord_log_channel":
            PageManager.loadPage("open:discord_logs_select", {
              interaction,
              collectorResponse: button,
            });
            return;
          case "discord_server_manager":
            button.showModal(getModal("discord_servers_modal"));
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
  }

  private static registerModalCollector(interaction: CommandProps) {
    new ModalCollector({
      response: interaction,
      timeout: 2147483647,
      filter: (i) => i.user.id === interaction.user.id,
      callback: async (modal) => {
        switch (modal.customId) {
          case "discord_embed_creator":
            const text = modal.fields.getTextInputValue("embed_creator");
            console.log("Feito => " + text);
            await modal.reply({
              content: "Modal recebido com sucesso!",
              ephemeral: true,
            });
            break;
          case "discord_servers_modal":
            const server_names = modal.fields.getTextInputValue("server_name");
            const server_available =
              modal.fields.getTextInputValue("server_available");
            console.log([server_names, server_available]);
            break;
          default:
            break;
        }
      },
    });
  }
}

// Command definition
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
          getEmbed("settings", "loading_settings", {
            user: user.globalName || "error 404",
          }),
        ],
        fetchReply: true,
      });

      PageManager.loadPage("open:settings_main_menu", {
        interaction,
        message,
      });

      CollectorsManager.registerCollectors(interaction, message);
    }
  },
});

interface Props {
  interaction: any;
  message?: any;
  collectorResponse?: any;
}
