import { ExtendedEvent } from '@extensions';

export default new ExtendedEvent({
  name: "interactionCreate",
  run(client, interaction) {
    if (interaction.isModalSubmit())
      client.modals.get(interaction.customId)?.(interaction);
    if (interaction.isButton())
      client.buttons.get(interaction.customId)?.(interaction);
    if (interaction.isStringSelectMenu())
      client.selects.get(interaction.customId)?.(interaction);
    if (interaction.isRoleSelectMenu())
      client.roleselect.get(interaction.customId)?.(interaction);
    if (interaction.isChannelSelectMenu())
      client.channelselect.get(interaction.customId)?.(interaction);
    if (interaction.isUserSelectMenu())
      client.userselect.get(interaction.customId)?.(interaction);
    if (interaction.isMentionableSelectMenu())
      client.mentionselect.get(interaction.customId)?.(interaction);
  },
});
