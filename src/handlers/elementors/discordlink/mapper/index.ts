import { client } from "../";
import { colors } from "@config";
import { ButtonStyle } from "discord.js";
import { registerRow } from "DiscordElementor";

export function register(): void {
  
  const isylium = client.user ? client.user.displayAvatarURL() : "";

  registerRow('settings', {
    embeds: {
      embed_settings: {
        color: colors.primary,
        description:
          "> Olá {user}, logo abaixo está todos os meus sistemas disponíveis para configuração",
        thumbnail: isylium,
        image:
          "https://cdn.discordapp.com/attachments/1261777733399347313/1295560563585454100/f1968b752dd03cce586e494eac75c237-1.png?ex=670f184c&is=670dc6cc&hm=c80a6d80e14b455d0fa9d49c63be64e9ea7ad278863a7ce2caf990d0e7d966b5&",
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