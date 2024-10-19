import { client } from "@main";
import { color } from "@config";
import { registerModal } from "DiscordElementor";
import { ChannelType, TextInputStyle } from "discord.js";

export function registerModals(): void {
  registerModal("discord_embed_creator", {
    title: "Criar painel de conexão",
    components: {
      inputs: {
        embed_creator: {
          label: "Embed Json",
          maxLength: 180,
          placeholder: '{value}',
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
          label: "Nome do Servidor",
          maxLength: 180,
          placeholder: 'Skyblock',
          required: true,
          style: TextInputStyle.Paragraph
        },
        server_available: {
          label: "Servidor Disponivel?",
          maxLength: 180,
          placeholder: 'true or false',
          required: true,
          style: TextInputStyle.Paragraph
        }
      }
    }
  });
}