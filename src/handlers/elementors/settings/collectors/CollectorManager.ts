import { CommandProps } from "@types";
import { client, mysql } from "@main";
import { PageManager } from "@handlers";
import { Logger, colors } from "Console";
import { HarvestConnection } from "@api/harvest";
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
  ButtonInteraction,
  ModalSubmitInteraction,
  StringSelectMenuBuilder
} from "discord.js";

export class CollectorsManager {
  static registerCollectors(interaction: CommandProps, message: any) {
    this.registerGlobalCollector(interaction, message);
    this.registerButtonCollector(interaction, message);
    this.registerModalCollector(interaction);
  }

  public static registerGlobalCollector(
    interaction: CommandProps,
    message: any
  ) {
    new GlobalCollector({
      response: message,
      componentType: ComponentType.StringSelect,
      timeout: 1200000,
      callback: async (select: SelectInteractionTypes) => {
        const { values } = select;
        const selected = values[0];

        switch (select.customId) {
          case "settings_menu":
            switch (selected) {
              case "settings:ticket":
                select.update({
                  content: `A função ${selected} não está habilitada`
                });
                break;
              case "settings:discordlink":
                PageManager.loadPage(
                  "open:discord_link_settings",
                  {
                    interaction,
                    collectorResponse: select
                  }
                );
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
      }
    });

    new GlobalCollector({
      response: message,
      componentType: ComponentType.ChannelSelect,
      timeout: null,
      callback: async (select: SelectInteractionTypes) => {
        const { values, guild } = select;
        const selected = values[0];

        switch (select.customId) {
          case "discord_logs_select":
            mysql.update("discord_link", { logs: selected }, [
              { guildid: guild.id }
            ]);
            PageManager.loadPage("open:discord_link_settings", {
              interaction,
              collectorResponse: select
            });
            break;
          case "discord_embed_select":
            mysql.update(
              "discord_link",
              { send_channel: selected },
              [{ guildid: guild.id }]
            );
            PageManager.loadPage("open:discord_link_settings", {
              interaction,
              collectorResponse: select
            });
          default:
            break;
        }
      },
      filter: async (select: SelectInteractionTypes) => {
        return select.user.id === interaction.user.id;
      }
    });
  }

  public static registerButtonCollector(
    interaction: CommandProps,
    message: any
  ) {
    new GlobalCollector({
      response: message,
      componentType: ComponentType.Button,
      timeout: 1200000,
      callback: async (button: ButtonInteraction) => {
        const { customId, guild } = button;

        if (customId.startsWith("server_status_view_")) {
          const newCustomId = customId.slice("server_status_view_".length);
          PageManager.loadPage("open:edit_servers", {
            interaction,
            collectorResponse: button
          });

        } else {
          switch (customId) {
            case "discord_embed_creator":
              /*   const serverLink = await mysql.select(
                     "discord_link",
                     "servers",
                     [{ guildid: guild.id }]
                 );
  
                 if (
                     !serverLink ||
                     serverLink[0].servers === null ||
                     (typeof serverLink === "string" &&
                         serverLink.trim() === "")
                 ) {
                     await button.reply({
                         content:
                             "Por favor, crie um servidor primeiro antes de usar o Embed Creator",
                         ephemeral: true
                     });
                     return;
                 }*/

              const embed = await mysql.select(
                "discord_link",
                "embeds_json",
                [{ guildid: guild.id }]
              );

              let embedJson;

              if (embed && embed[0] && embed[0].embeds_json) {
                try {
                  embedJson = JSON.parse(embed[0].embeds_json);
                } catch (error) {
                  new Logger("null", {
                    title: colors.red("[ISYLIUM MODULES]"),
                    content: `Erro ao ler o json ${error}`
                  });

                  embedJson = { title: "teste" };
                }
              } else {
                embedJson = { title: "teste" };
              }

              button.showModal(
                getModal("discord_embed_creator", {
                  value: JSON.stringify(embedJson, null, 2)
                })
              );
              return;
            case "discord_log_channel":
              PageManager.loadPage("open:discord_logs_select", {
                interaction,
                collectorResponse: button
              });
            case "discord_server_manager":
              PageManager.loadPage("open:edit_servers", {
                interaction,
                collectorResponse: button
              });

              return;
            case "server_status_view_back":
              PageManager.loadPage("open:discord_link_settings", {
                interaction,
                collectorResponse: button
              });

              return;
            default:
              break;
          }
        }
      },
      filter: async (button: ButtonInteraction) => {
        return button.user.id === interaction.user.id;
      }
    });
  }

  public static registerModalCollector(interaction: CommandProps) {
    new ModalCollector({
      response: interaction,
      timeout: 1200000,
      filter: i => i.user.id === interaction.user.id,
      callback: async modal => {
        const { guild, fields } = modal;

        switch (modal.customId) {
          case "discord_embed_creator":
            const text = fields.getTextInputValue("embed_creator");

            mysql.update("discord_link", { embeds_json: text }, [
              { guildid: guild.id }
            ]);
            const lastMessage = await modal.channel?.messages.fetch(
              {
                limit: 1
              }
            );
            const message = lastMessage?.find(
              msg =>
                msg.author.id === client.user?.id &&
                msg.embeds.length > 0
            );
            if (message) {
              PageManager.loadPage("open:discord_embed_send", {
                interaction,
                collectorResponse: modal
              });
            }
            break;
          case "discord_servers_modal":
            const server = fields.getTextInputValue("server_name");
            mysql.update("discord_link", { servers: server }, [
              { guildid: guild.id }
            ]);
            modal.reply({
              content:
                "Servidor criado ou atualizado com sucesso",
              ephemeral: true,
              fetchReply: true
            });
            break;
          case "discord_send_gift":
            const name = fields.getTextInputValue("player_nickname");
            const data = fields.getTextInputValue("gift_data");
            const parseData = JSON.parse(data);
            modal.reply({
              content: 'Resultado! ' + JSON.stringify(HarvestConnection.sendGift(name, (parseData.type ?? 'coins'), (parseData.value ?? 1)), null, 2),
              ephemeral: true
            });
            break;
          default:
            break;
        }
      }
    });
  }
}
