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
          "> Olá {user}, logo abaixo está todos os meus sistemas disponíveis para configuração",
        thumbnail: isylium,
        image: profile.icon,
        author: {
          name: `Isylium`,
          iconURL: profile.icon,
        }
      }
    },
    components: {
      selects: {
        settings: {
          type: "string",
          data: {
            disabled: false,
            placeholder: "Opções de configuração",
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