import { CommandProps } from "@types";
import { client, mysql } from "@main";
import { PageManager } from "@handlers";
import {
    getModal,
    getEmbed,
    getSelect,
    getButton,
    ModalCollector,
    GlobalCollector,
    SelectInteractionTypes
} from "DiscordElementor";
import {
    ComponentType,
    ButtonInteraction,
    ModalSubmitInteraction,
    StringSelectMenuBuilder
} from "discord.js";

export class CollectorsManager {
    static registerCollectors(interaction: CommandProps, message: any) {
        this.registerGlobalCollector(interaction, message);
        this.registerButtonCollector(interaction, message);
        this.registerModalCollector(interaction);
    }

    public static registerGlobalCollector(
        interaction: CommandProps,
        message: any
    ) {
        new GlobalCollector({
            response: message,
            componentType: ComponentType.StringSelect,
            timeout: 1200000,
            callback: async (select: SelectInteractionTypes) => {
                const { values } = select;
                const selected = values[0];

                switch (select.customId) {
                    case "settings_menu":
                        switch (selected) {
                            case "settings:ticket":
                                select.update({
                                    content: `A função ${selected} não está habilitada`
                                });
                                break;
                            case "settings:discordlink":
                                PageManager.loadPage(
                                    "open:discord_link_settings",
                                    {
                                        interaction,
                                        collectorResponse: select
                                    }
                                );
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            },
            filter: async (select: SelectInteractionTypes) => {
                return select.user.id === interaction.user.id;
            }
        });

        new GlobalCollector({
            response: message,
            componentType: ComponentType.ChannelSelect,
            timeout: null,
            callback: async (select: SelectInteractionTypes) => {
                const { values, guild } = select;
                const selected = values[0];

                switch (select.customId) {
                    case "discord_logs_select":
                        mysql.update("discord_link", { logs: selected }, [
                            { guildid: guild.id }
                        ]);
                        PageManager.loadPage("open:discord_link_settings", {
                            interaction,
                            collectorResponse: select
                        });
                        break;
                    default:
                        break;
                }
            },
            filter: async (select: SelectInteractionTypes) => {
                return select.user.id === interaction.user.id;
            }
        });
    }

    public static registerButtonCollector(
        interaction: CommandProps,
        message: any
    ) {
        new GlobalCollector({
            response: message,
            componentType: ComponentType.Button,
            timeout: 1200000,
            callback: async (button: ButtonInteraction) => {
                const { customId, guild } = button;

                switch (customId) {
                    case "discord_embed_creator":
                        const embed = await mysql.select(
                            "discord_link",
                            "embeds_json",
                            [{ guildid: guild.id }]
                        );

                        if (embed !== null) {
                            const embedJson =
                                embed[0].embed_json ||
                                `{\n "title": "teste"\n}`;
                            button.showModal(
                                getModal("discord_embed_creator", {
                                    value: embedJson
                                })
                            );
                        }
                        return;
                    case "discord_log_channel":
                        PageManager.loadPage("open:discord_logs_select", {
                            interaction,
                            collectorResponse: button
                        });
                        return;
                    case "discord_server_manager":
                        const server = await mysql.select(
                            "discord_link",
                            "servers",
                            [{ guildid: guild.id }]
                        );

                        if (server !== null) {
                            const serverjson =
                                server[0].servers ||
                                `{\n "rankup": "true"//online\n\n"factions": "false"//offline\n}`;
                            button.showModal(
                                getModal("discord_servers_modal", {
                                    value: serverjson
                                })
                            );
                        }
                        return;
                    default:
                        break;
                }
            },
            filter: async (button: ButtonInteraction) => {
                return button.user.id === interaction.user.id;
            }
        });
    }

    public static registerModalCollector(interaction: CommandProps) {
        new ModalCollector({
            response: interaction,
            timeout: 1200000,
            filter: i => i.user.id === interaction.user.id,
            callback: async modal => {
                switch (modal.customId) {
                    case "discord_embed_creator":
                        const text =
                            modal.fields.getTextInputValue("embed_creator");
                        console.log(text);
                        await modal.reply({
                            content: "Modal recebido com sucesso!",
                            ephemeral: true
                        });
                        break;
                    case "discord_servers_modal":
                        const server_names =
                            modal.fields.getTextInputValue("server_name");
                        console.log(server_names);
                        await modal.reply({
                            content: "Modal recebido com sucesso!",
                            ephemeral: true
                        });
                        break;
                    default:
                        break;
                }
            }
        });
    }
}
