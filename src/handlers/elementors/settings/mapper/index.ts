import { client } from "@main";
import { color, profile } from "@config";
import { ButtonStyle } from "discord.js";
import { registerRow } from "DiscordElementor";

export function register(): void {

  registerRow('settings', {
    embeds: {
      embed_settings: {
        color: color.primary,
        description:
          "> Olá, {user}! Bem-vindo ao menu de configurações do Isylium Bot.\n> Aqui você encontrará todas as opções disponíveis para personalizar os sistemas do Isylium Bot de acordo com as necessidades.",
        author: {
          name: "Isylium",
          iconURL: profile.icon,
        },
      }
    },
    components: {
      select_start: {
        settings: {
          type: "string",
          data: {
            disabled: false,
            placeholder: " Opções de configuração",
            options: [
              {
                label: "Ticket",
                description: "configurar sistema de ticket",
                emoji: "<:ticket:1295558483927629835>",
                value: "settings:ticket"
              },
              {
                label: "Discord Link",
                description: "Configurar sistema de conexão ao discord",
                emoji: "<:discord:1295557503555207302>",
                value: "settings:discordlink"
              }
            ],
          }
        }
      },
    }
  });
}