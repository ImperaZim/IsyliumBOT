import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { CreatedGuild, SettingsController } from "@handlers";
import { getSelect, getEmbed } from "DiscordElementor";
import { ApplicationCommandType } from "discord.js";
const settings = "settings";

export default new ExtendedCommand({
    name: "settings",
    description: "Server systems configuration",
    defaultMemberPermissions: "Administrator",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }: CommandProps) {
        if (!interaction.inCachedGuild()) return;
        const { user, guild } = interaction;
        const data = new CreatedGuild(guild).checkAndAddGuild();
        if (data) {
            const embed_start = getEmbed(settings, "embed_settings", {
                user: user.globalName || "error 404"
            });
            const select_start = getSelect(settings, "select_settings");

            const response = await interaction.reply({
                embeds: [embed_start],
                components: [
                    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                        [select_start]
                    )
                ]
            });
            SettingsController(response, user, guild);
        }
    }
});
