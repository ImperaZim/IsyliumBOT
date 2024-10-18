import { client } from "@main";
import { color, profile } from "@config";
import { ButtonStyle, ChannelType, TextInputStyle } from "discord.js";
import { registerRow, registerModal } from "DiscordElementor";

export function register(): void {
  registerRow("settings", {
    embeds: {
      loading_settings: {
        color: color.primary,
        description:
          "> Estou carregando as configurações, por favor espere um pouco!",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon
        }
      },
      settings_main_menu: {
        color: color.primary,
        description:
          "> Olá, {user}! Bem-vindo ao menu de configurações do Isylium Bot. Aqui você pode personalizar os sistemas do bot conforme suas necessidades.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon
        }
      },
      discord_link_settings: {
        color: color.primary,
        description:
          "> Olá, {user}! Use os botões abaixo para configurar o sistema de integração com o Discord. Consulte este [website](https://zira.bot/embedbuilder/) para criar JSONs de embeds, se necessário.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon
        }
      },
      discord_logs_setup: {
        color: color.primary,
        description:
          "> Olá, {user}! Escolha o canal de logs do seu servidor no seletor abaixo.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon
        }
      },
      discord_servers_setup: {
        color: color.primary,
        description:
          "> Olá, {user}! Use a opção abaixo para gerenciar sua lista de servidores.",
        author: {
          name: "Isylium Bot",
          iconURL: profile.icon
        }
      }
    },
    components: {
      selects: {
        settings_menu: {
          type: "string",
          data: {
            disabled: false,
            placeholder: "Selecione uma opção de configuração",
            options: [
              {
                label: "Sistema de Tickets",
                description: "Configurar o sistema de tickets",
                emoji: "<:ticket:1295558483927629835>",
                value: "settings:ticket"
              },
              {
                label: "Sistema de Conexão ao Discord",
                description: "Configurar a integração do Discord",
                emoji: "<:discord:1295557503555207302>",
                value: "settings:discordlink"
              }
            ]
          }
        },
        discord_logs_select: {
          type: "channel",
          data: {
            disabled: false,
            placeholder: "Escolha o canal de logs",
            minValue: 1,
            maxValue: 1,
            channelTypes: [ChannelType.GuildText]
          }
        }
      },
      buttons: {
        discord_embed_creator: {
          type: ButtonStyle.Primary,
          data: {
            label: "Criador de Embed",
            emoji: "<a:lapis:1295608106965012541>"
          }
        },
        discord_log_channel: {
          type: ButtonStyle.Primary,
          data: {
            label: "Canal de Logs",
            emoji: "<:channel:1295608647484706858>"
          }
        },
        discord_server_manager: {
          type: ButtonStyle.Primary,
          data: {
            label: "Gerenciar Servidor",
            emoji: "<:servers:1295609099819421747>"
          }
        },
        discord_server_delete: {
          type: ButtonStyle.Danger,
          data: {
            label: "Excluir Servidor",
            emoji: "<:servers:1295609099819421747>"
          }
        },
        discord_server_create: {
          type: ButtonStyle.Success,
          data: {
            label: "Criar Servidor",
            emoji: "<:servers:1295609099819421747>"
          }
        },
        discord_embed_edit: {
          type: ButtonStyle.Primary,
          data: {
            label: "Editar Embed",
            emoji: "<a:lapis:1295608106965012541>"
          }
        },
        discord_embed_send: {
          type: ButtonStyle.Success,
          data: {
            label: "Enviar Mensagem",
            emoji: "<:send:1296616875727388704>"
          }
        },
        discord_embed_review: {
          type: ButtonStyle.Primary,
          data: {
            label: "Revisar Mensagem",
            emoji: "<:send:1296616875727388704>"
          }
        }
      }

    }
  });
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
  registerModal("dcl_servers_modal", {
    title: "Criar servidor",
    components: {
      inputs: {
        server_name: {
          label: "Nome do Servidor",
          maxLength: 180,
          placeholder: "SkyBlock",
          required: true,
          style: TextInputStyle.Paragraph
        },
        server_available: {
          label: "Servidor Disponivel?",
          maxLength: 180,
          placeholder: "true or false",
          required: true,
          style: TextInputStyle.Paragraph
        }
      }
    }
  });
}
