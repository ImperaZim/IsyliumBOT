import {
    User,
    Guild,
    SelectMenuInteraction,
    ButtonInteraction,
    RoleSelectMenuInteraction,
    ChannelSelectMenuInteraction,
    ComponentType,
    ActionRowBuilder
} from "discord.js";
import {
    ButtonCollector,
    SelectCollector,
    ModalCollector,
    getSelect,
    getEmbed,
    getButton,
    getModal
} from "DiscordElementor";
import { client, mysql } from "@main";
const settings = "settings";
const time = 20 * 60 * 1000;

//ComponentType.RoleSelect

export function SettingsController(response: any, user: User, guild: Guild) {
    //SelectMenuInteraction
    return new SelectCollector(
        response,
        (select: SelectMenuInteraction) => {
            const { values, user } = select;
            const options = values[0];
            if (options === "settings:discordlink") {
                const embed_discordlink = getEmbed(
                    settings,
                    "settings_discordlink",
                    {
                        user: user.globalName || "error 404"
                    }
                );
                const buttons = ["dcl_embed", "dcl_logs", "dcl_servers"].map(
                    buttonName => getButton(settings, buttonName)
                );
                const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                    buttons
                );
                const components = ([row] || []).map(ar => ar.toJSON());

                select.update({
                    embeds: [embed_discordlink],
                    components: components
                });
            }
        },
        ComponentType.StringSelect,
        time,
        (select: SelectMenuInteraction) => select.user.id === user.id
    );
    //ChannelSelectMenuInteraction
    return new SelectCollector(
        response,
        (channel: ChannelSelectMenuInteraction) => {
            const { values, user } = channel;
            mysql.update(
                "discord_link",
                {
                    logs: values[0]
                },
                [
                    {
                        guildid: guild.id
                    }
                ]
            );

            const embed_discordlink = getEmbed(
                settings,
                "settings_discordlink",
                {
                    user: user.globalName || "error 404"
                }
            );
            const buttons = ["dcl_embed", "dcl_logs", "dcl_servers"].map(
                buttonName => getButton(settings, buttonName)
            );
            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                buttons
            );
            const components = ([row] || []).map(ar => ar.toJSON());

            channel.update({
                embeds: [embed_discordlink],
                components: components
            });
        },
        ComponentType.ChannelSelect,
        time,
        (channel: ChannelSelectMenuInteraction) => channel.user.id === user.id
    );
    //ButtonInteraction
    return new ButtonCollector(
        response,
        (buttons: ButtonInteraction) => {
            const { customId, user, showModal } = buttons;
            const clicked = customId;
            // Discord Link
            if (clicked.includes("dcl_logs")) {
                const dcl_logs = getEmbed(settings, "dcl_logs", {
                    user: user.globalName || "error 404"
                });
                const select_logs = getSelect(settings, "dcl_select_logs");

                buttons.update({
                    embeds: [dcl_logs],
                    components: [
                        new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
                            [select_logs]
                        )
                    ]
                });
            }
            if (clicked.includes("dcl_embed")) {
                const modal_embed = getModal("dcl_embed_modal");
                showModal(modal_embed);
            }
        },
        ComponentType.Button,
        time,
        (button: ButtonInteraction) => button.user.id === user.id
    );
}
