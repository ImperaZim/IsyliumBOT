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
                thumbnail:
                    "https://cdn.iconfinder.com/data/icons/general-icons-rounded/110/Settings-512.png"
            },
            settings_main_menu: {
                color: color.primary,
                description:
                    "> ⚙️ Olá, {user}! Bem-vindo ao menu de configurações do **Isylium Bot**! Aqui, você pode personalizar todas as funcionalidades do bot para o seu servidor.",
                thumbnail:
                    "https://cdn.iconfinder.com/data/icons/general-icons-rounded/110/Settings-512.png"
            },
            discord_link_settings: {
                color: color.primary,
                description:
                    "> 🔗 Olá, {user}! Configure a integração do bot com o Discord usando os botões abaixo. Consulte este [site](https://zira.bot/embedbuilder/) para criar JSONs de embeds, se precisar.",
                thumbnail:
                    "https://img.icons8.com/ios-filled/500/discord-integration.png"
            },
            discord_logs_setup: {
                color: color.primary,
                description:
                    "> 📝 Selecione o canal para os **logs do Discord** para manter um histórico organizado das atividades no seu servidor.",
                thumbnail:
                    "https://cdn-icons-png.flaticon.com/512/3659/3659921.png"
            },
            discord_send_setup: {
                color: color.primary,
                description:
                    "> 📢 Escolha o canal onde deseja enviar o painel do bot para o seu servidor.",
                thumbnail:
                    "https://img.icons8.com/ios-filled/500/discord-integration.png"
            },
            ticket_logs_setup: {
                color: color.primary,
                description:
                    "> 🎫 Escolha o canal para os **logs de tickets** do servidor para acompanhar as solicitações.",
                thumbnail:
                    "https://cdn-icons-png.flaticon.com/512/3050/3050293.png"
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
                        placeholder: "Escolha o canal de logs",
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
                }
            },
            buttons: {
                discord_embed_creator: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Criador de Embed",
                        emoji: "✏️"
                    }
                },
                discord_log_channel: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Canal de Logs",
                        emoji: "📋"
                    }
                },
                discord_server_manager: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Gerenciar Servidor",
                        emoji: "🛠️"
                    }
                },
                ticket_embed_creator: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Criador de Embed",
                        emoji: "✏️"
                    }
                },
                tickey_log_channel: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Canal de Logs",
                        emoji: "📋"
                    }
                },
                ticket_role_perm: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Gerenciar Permissões",
                        emoji: "🔒"
                    }
                }
            }
        }
    });
}
