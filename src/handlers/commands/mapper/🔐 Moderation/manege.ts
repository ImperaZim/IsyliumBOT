import { CommandProps } from "@types";
import { client, mysql } from "@main";
import { ExtendedCommand } from "@extensions";
import { CreatedGuild, PageManager, CollectorsManager } from "@handlers";
import { getEmbed } from "DiscordElementor";
import { ApplicationCommandType } from 'discord.js';

const settings = "settings";

export default new ExtendedCommand({
    name: "settings",
    description: "Server systems configuration",
    defaultMemberPermissions: "Administrator",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }: CommandProps) {
        if (!interaction.inCachedGuild()) return;

        const { user, guild } = interaction;

        if (new CreatedGuild(guild).checkAndAddGuild()) {
            const message = await interaction.reply({
                embeds: [
                    getEmbed("settings", "loading_settings", {
                        user: user.globalName || "error 404"
                    })
                ],
                fetchReply: true
            });

            new PageManager.loadPage("open:settings_main_menu", {
                interaction,
                message
            });

            new CollectorsManager.registerCollectors(interaction, message);
        }
    }
});
