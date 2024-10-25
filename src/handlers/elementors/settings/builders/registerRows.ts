import { client } from "@main";
import { color, assets } from "@config";
import { registerRow } from "DiscordElementor";
import { ChannelType, ButtonStyle } from "discord.js";
const { ticket, dcl, settings, shop } = assets;

export function registerRows(): void {
    registerRow("settings", {
        embeds: {
            loading_settings: {
                color: color.primary,
                description:
                    "> Estou carregando as configurações, por favor espere um pouco!",
                thumbnail: settings
            },
            settings_main_menu: {
                color: color.primary,
                description:
                    "> Olá, {user}! Bem-vindo ao menu de configurações do Isylium Bot. Aqui você pode personalizar os sistemas do bot conforme suas necessidades.",
                thumbnail: settings
            },
            discord_link_settings: {
                color: color.primary,
                description:
                    "> Olá, {user}! Use os botões abaixo para configurar o sistema de integração com o Discord. Consulte este [website](https://zira.bot/embedbuilder/) para criar JSONs de embeds, se necessário.",
                thumbnail: dcl
            },
            discord_logs_setup: {
                color: color.primary,
                description:
                    "> Olá, {user}! Escolha o canal de logs do seu servidor no seletor abaixo.",
                thumbnail: dcl
            },
            discord_send_setup: {
                color: color.primary,
                description:
                    "> Olá, {user}! Escolha o canal para enviar seu painel no seletor abaixo.",
                thumbnail: dcl
            },
            ticket_logs_setup: {
                color: color.primary,
                description:
                    "> Olá, {user}! Escolha o canal de logs do seu servidor no seletor abaixo.",
                thumbnail: ticket
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
                                //   emoji: "<:ticket:1295558483927629835>",
                                value: "settings:ticket"
                            },
                            {
                                label: "Sistema de Conexão ao Discord",
                                description:
                                    "Configurar a integração do Discord",
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
                        label: "Criador de Embed"
                        //emoji: "<a:lapis:1295608106965012541>"
                    }
                },
                discord_log_channel: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Canal de Logs"
                        //  emoji: "<:channel:1295608647484706858>"
                    }
                },
                discord_server_manager: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Gerenciar Servidor"
                        //emoji: "<:servers:1295609099819421747>"
                    }
                },
                ticket_embed_creator: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Criador de Embed",
                        emoji: "<a:lapis:1295608106965012541>"
                    }
                },
                tickey_log_channel: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Canal de Logs",
                        emoji: "<:channel:1295608647484706858>"
                    }
                },
                ticket_role_perm: {
                    type: ButtonStyle.Secondary,
                    data: {
                        label: "Gerenciar Permissões",
                        emoji: "<:role:1298447123511246851>"
                    }
                }
            }
        }
    });
}
