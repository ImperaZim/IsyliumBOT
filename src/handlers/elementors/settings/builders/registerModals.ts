import { client } from "@main";
import { color } from "@config";
import { TextInputStyle } from "discord.js";
import { registerModal } from "DiscordElementor";
import { HarvestConnection } from "@api/harvest";

export function registerModals(): void {
  registerModal("discord_embed_creator", {
    title: "Criar painel de conexão",
    components: {
      inputs: {
        embed_creator: {
          label: "Embed Json",
          maxLength: 180,
          value: "{value}",
          required: true,
          style: TextInputStyle.Paragraph
        }
      }
    }
  });
  registerModal("discord_servers_modal", {
    title: "Criar servidor",
    components: {
      inputs: {
        server_name: {
          label: "Server Json",
          maxLength: 180,
          value: "{value}",
          required: true,
          style: TextInputStyle.Paragraph
        }
      }
    }
  });
  registerModal("discord_send_gift", {
    title: "Enviar Presente",
    components: {
      inputs: {
        player_nickname: {
          label: "Player Nickname",
          maxLength: 180,
          value: "",
          required: true,
          style: TextInputStyle.Paragraph
        },
        gift_data: {
          label: "Gift Details",
          maxLength: 180,
          value: JSON.stringify({
            type: "(coins, cristals, title, item)",
            value: "({} for item) or write value were!"
          }, null, 2),
          required: true,
          style: TextInputStyle.Paragraph
        }
      }
    }
  });
}
