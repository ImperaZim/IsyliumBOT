import { getEmbed, getSelect, getButton } from "DiscordElementor";
import { ActionRowBuilder } from "discord.js";
import { LoadPagesinterface } from "@types";

export class PageManager {
  private static settings = "settings";

  static async loadPage(id: string, properties: LoadPagesinterface) {
    let embeds = [];
    let components = [];
    const { user } = properties.interaction;

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
          getEmbed(this.settings, "discord_servers_setup", {
            user: user.globalName || "error 404"
          })
        );
        components.push(
          getSelect(this.settings, "discord_logs_select")
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
