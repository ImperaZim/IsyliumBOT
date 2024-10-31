import { getEmbed, getSelect, getButton } from "DiscordElementor";
import { ActionRowBuilder, ButtonStyle } from "discord.js";
import { LoadPagesinterface } from "@types";
import { mysql } from "@main";

export class PageManager {
  private static settings = "settings";

  static async loadPage(id: string, properties: LoadPagesinterface) {
    let embeds = [];
    let components = [];
    const { user, guild } = properties.interaction;

    switch (id) {
      case "open:settings_main_menu":
        embeds.push(
          getEmbed(this.settings, "settings_main_menu", {
            user: user.globalName || "error 404"
          })
        );
        components.push(getSelect(this.settings, "settings_menu"));
        break;

      case "open:discord_logs_select":
        embeds.push(
          getEmbed(this.settings, "discord_logs_setup", {
            user: user.globalName || "error 404"
          })
        );
        components.push(
          getSelect(this.settings, "discord_logs_select")
        );
        break;
      case "open:discord_embed_send":
        embeds.push(
          getEmbed(this.settings, "discord_send_setup", {
            user: user.globalName || "error 404"
          })
        );
        components.push(
          getSelect(this.settings, "discord_embed_select")
        );
        break;

      case "open:discord_link_settings":
        embeds.push(
          getEmbed(this.settings, "discord_link_settings", {
            user: user.globalName || "error 404"
          })
        );
        components.push(
          getButton(this.settings, "discord_embed_creator")
        );
        components.push(
          getButton(this.settings, "discord_log_channel")
        );
        components.push(
          getButton(this.settings, "discord_server_manager")
        );
        break;

      case "open:edit_servers":
        embeds.push(
          getEmbed(this.settings, "edit_servers")
        );

        const server = await mysql.select(
          "discord_link",
          "servers",
          [{ guildid: guild.id }]
        );

        let serverJson = {
          skyblock: false,
          rankup: true
        };

        if (server && server[0] && server[0].servers) {
          try {
            serverJson = JSON.parse(server[0].servers);
          } catch (error) {
            new Logger("null", {
              title: colors.red("[ISYLIUM MODULES]"),
              content: `Erro ao ler o json ${error}`
            });
          }
        }

        Object.entries(serverJson).forEach(([serverName, serverStatus]) => {
          components.push(
            getButton(this.settings, "server_status_view", {
              label: serverName
            }).setStyle(serverStatus ? ButtonStyle.Primary : ButtonStyle.Danger)
          );
        });
        getButton(this.settings, "server_status_view_back")
        break;
      default:
        break;
    }

    components = [new ActionRowBuilder().addComponents(...components)];

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
}
