import { client } from "@main";
import { color, assets } from "@config";
import { registerRow } from "DiscordElementor";
import { ChannelType, ButtonStyle } from "discord.js";

export function registerRows(): void {
  registerRow("settings", {
    embeds: {
      loading_settings: {
        color: color.primary,
        description:
          "> ⏳ Estou carregando as configurações... Por favor, aguarde enquanto tudo é ajustado para você!",
      },
      settings_main_menu: {
        color: color.primary,
        description:
          "> ⚙️ Olá, {user}! Bem-vindo ao menu de configurações do **Isylium Bot**! Aqui, você pode personalizar todas as funcionalidades do bot para o seu servidor.",
      },
      discord_link_settings: {
        color: color.primary,
        description:
          "> 🔗 Olá, {user}! Configure a integração do bot com o Discord usando os botões abaixo. Consulte este [site](https://zira.bot/embedbuilder/) para criar JSONs de embeds, se precisar.",
      },
      discord_logs_setup: {
        color: color.primary,
        description:
          "> 📝 Selecione o canal para os **logs do Discord limk** para manter um histórico organizado das atividades no seu servidor.",
      },
      discord_send_setup: {
        color: color.primary,
        description:
          "> 📢 Escolha o canal onde deseja enviar o painel do bot para o seu servidor.",
      },
      ticket_logs_setup: {
        color: color.primary,
        description:
          "> 🎫 Escolha o canal para os **logs de tickets** do servidor para acompanhar as solicitações.",
      },
      ticket_send_setup: {
        color: color.primary,
        description:
          "> 📢 Escolha o canal onde deseja enviar o painel de atendimento do bot para o seu servidor.",
      },
      edit_servers: {
        color: color.primary,
        description:
          "> Editor de status, clique no botão referente ao servidor para alterar.",
      },
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
                emoji: "🎫",
                value: "settings:ticket"
              },
              {
                label: "Sistema de Conexão ao Discord",
                description:
                  "Configurar a integração do Discord",
                emoji: "🔗",
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
        },
        discord_embed_select: {
          type: "channel",
          data: {
            disabled: false,
            placeholder: "Escolha o canal para enviar",
            minValue: 1,
            maxValue: 1,
            channelTypes: [ChannelType.GuildText]
          }
        },
        ticket_logs_select: {
          type: "channel",
          data: {
            disabled: false,
            placeholder: "Escolha o canal de logs",
            minValue: 1,
            maxValue: 1,
            channelTypes: [ChannelType.GuildText]
          }
        },
        ticket_embed_select: {
          type: "channel",
          data: {
            disabled: false,
            placeholder: "Escolha o canal para enviar",
            minValue: 1,
            maxValue: 1,
            channelTypes: [ChannelType.GuildText]
          }
        },
      },
      buttons: {
        server_status_view: {
          type: ButtonStyle.Secondary,
          data: {
            label: "{label}"
          }
        },
        server_status_view_back: {
          type: ButtonStyle.Secondary,
          data: {
            label: "Voltar ao Menu",
            emoji: "📥"
          }
        },
        discord_embed_creator: {
          type: ButtonStyle.Primary,
          data: {
            label: "Criador de Embed",
            emoji: "✏️"
          }
        },
        discord_log_channel: {
          type: ButtonStyle.Primary,
          data: {
            label: "Canal de Logs",
            emoji: "📋"
          }
        },
        discord_server_manager: {
          type: ButtonStyle.Primary,
          data: {
            label: "Gerenciar Servidor",
            emoji: "🛠️"
          }
        },
        ticket_embed_creator: {
          type: ButtonStyle.Primary,
          data: {
            label: "Criador de Embed",
            emoji: "✏️"
          }
        },
        tickey_log_channel: {
          type: ButtonStyle.Primary,
          data: {
            label: "Canal de Logs",
            emoji: "📋"
          }
        },
        ticket_role_perm: {
          type: ButtonStyle.Primary,
          data: {
            label: "Gerenciar Permissões",
            emoji: "🔒"
          }
        }
      }
    }
  });
}
