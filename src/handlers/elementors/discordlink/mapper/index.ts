import { client } from "../";
import { colors } from "@config";
import { ButtonStyle } from "discord.js";
import { registerRow } from "DiscordRow";

export function register(): void {
  const tohru = client.user;

  const isylium = client.user ? client.user.displayAvatarURL() : "";

  registerRow('botinfo', {
    embeds: {
      embed_info: {
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
      buttons: {
        add_me: {
          type: ButtonStyle.Link,
          data: {
            label: "Me Adicione",
            url: "https://discord.com/api/oauth2/authorize?client_id=1141401998709760051&permissions=8&scope=bot"
          }
        },
        support: {
          type: ButtonStyle.Link,
          data: {
            label: "Suporte",
            url: "https://discord.com/api/oauth2/authorize?client_id=1141401998709760051&permissions=8&scope=bot"
          }
        }
      }
    }
  });
}