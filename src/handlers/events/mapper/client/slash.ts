import { ExtendedEvent } from "@@extensions";
import { CommandInteractionOptionResolver } from "discord.js";

export default new ExtendedEvent({
    name: "interactionCreate",
    run(client, interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if (interaction.isAutocomplete() && command.autoComplete){
            command.autoComplete(interaction);
            return;
        }

        if (interaction.isChatInputCommand()) {
            const options = interaction.options as CommandInteractionOptionResolver
            command.run({ client, interaction, options })
            return;
        }
    },
})