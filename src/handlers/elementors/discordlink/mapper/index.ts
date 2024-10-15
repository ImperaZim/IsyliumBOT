import { client } from "../";
import { colors } from "@config";
import { ButtonStyle } from "discord.js";
import { registerRow } from "DiscordElementor";

export function register(): void {
  const tohru = client.user;

  const isylium = client.user ? client.user.displayAvatarURL() : "";

  registerRow('settings', {
    embeds: {
      embed_settings: {
        color: colors.primary,
        description:
          "> Olá {user}, logo abaixo está todos os meus sistemas disponíveis para configuração",
        thumbnail: isylium,
        image:
          "https://cdn.discordapp.com/attachments/1141418051284250724/1144087125193674802/1692842014805.png",
        author: {
          name: `Isylium`,
          iconURL: isylium,
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