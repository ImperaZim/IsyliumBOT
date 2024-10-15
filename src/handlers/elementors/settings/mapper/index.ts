import { client } from "@main";
import { color, profile } from "@config";
import { ButtonStyle, ChannelType } from "discord.js";
import { registerRow } from "DiscordElementor";

export function register(): void {

  registerRow('settings', {
    embeds: {
      embed_settings: {
        color: color.primary,
        description:
          "> Olá, {user}! Bem-vindo ao menu de configurações do Isylium Bot.\n> Aqui você encontrará todas as opções disponíveis para personalizar os sistemas do Isylium Bot de acordo com as necessidades.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon,
        },
      },
      settings_discordlink: {
        color: color.primary,
        description:
          "> Olá, {user}! use os botões abaixo para configurar sistema de conexão ao discord.\n\n> 🔵 Use este [website]( para criar os json dos embeds se necessário.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon,
        },
      },
      dcl_logs: {
        color: color.primary,
        description:
          "> Olá, {user}! Selecione o canal de logs do seu servidor no select abaixo.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon,
        },
      },
      dcl_servers: {
        color: color.primary,
        description:
          "> Olá, {user}! Selecione a opção abaixo que deseja executar para fazer sua lista de servidores.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon,
        },
      }
    },
    components: {
      selects: {
        select_settings: {
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
        },
        dcl_select_logs: {
          type: "channel",
          data: {
            disabled: false,
            placeholder: " Escolha o canal de logs abaixo.",
            minValue: 1,
            maxValue: 10,
            channelTypes: [
              ChannelType.GuildText
            ]
          }
        },
      },
      buttons: {
        dcl_embed: {
          type: ButtonStyle.Primary,
          data: {
            label: "Embed Creator",
            emoji: "<a:lapis:1295608106965012541>"
          }
        },
        dcl_logs: {
          type: ButtonStyle.Primary,
          data: {
            label: "Log Channel",
            emoji: "<:channel:1295608647484706858>"
          }
        },
        dcl_servers: {
          type: ButtonStyle.Primary,
          data: {
            label: "Build Server",
            emoji: "<:servers:1295609099819421747>"
          }
        },
        dlc_rems: {
          type: ButtonStyle.Primary,
          data: {
            label: "Delete server",
            emoji: "<:servers:1295609099819421747>"
          }
        },
        dcl_adds: {
          type: ButtonStyle.Primary,
          data: {
            label: "Create server",
            emoji: "<:servers:1295609099819421747>"
          }
        },
      },
    }
  });
  registerModal("dcl_embed_modal", {
    title: "Criar painel de conexão",
    components: {
      inputs: {
        embed_creator: {
          label: "Embed Json",
          maxLength: 180,
          placeholder: '{\n "title": "teste"\n}',
          required: true,
          style: TextInputStyle.Paragraph
        }
      }
    }
  });
}