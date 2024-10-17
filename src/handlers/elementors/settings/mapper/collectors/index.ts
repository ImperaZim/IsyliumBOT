import {
  User,
  Guild,
  SelectMenuInteraction,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ComponentType,
  ActionRowBuilder,
  ButtonBuilder,
  ChannelSelectMenuBuilder
} from "discord.js";
import { ButtonCollector, SelectCollector, getEmbed, getButton, getSelect, getModal } from "DiscordElementor";
import { mysql } from "@main";

const settings = "settings";
const time = 20 * 60 * 1000;

export class SettingsController {
  private user: User;
  private guild: Guild;

  constructor(user: User, guild: Guild) {
    this.user = user;
    this.guild = guild;
  }

  async startSettingsInteraction(response: any) {
    this.initSelectCollector(response);
    this.initButtonCollector(response);
  }

  private initSelectCollector(response: any) {
    new SelectCollector(
      response,
      async (menu: SelectMenuInteraction) => this.handleSelectMenu(menu),
      ComponentType.StringSelect,
      time,
      (select: SelectMenuInteraction) => select.user.id === this.user.id
    );

    new SelectCollector(
      response,
      async (channel: ChannelSelectMenuInteraction) => this.handleChannelSelectMenu(channel),
      ComponentType.ChannelSelect,
      time,
      (channel: ChannelSelectMenuInteraction) => channel.user.id === this.user.id
    );
  }

  private initButtonCollector(response: any) {
    new ButtonCollector(
      response,
      async (button: ButtonInteraction) => this.handleButtonInteraction(button),
      ComponentType.Button,
      time,
      (button: ButtonInteraction) => button.user.id === this.user.id
    );
  }

  private async updateSettingsPage(interaction: SelectMenuInteraction | ButtonInteraction) {
    const embed = getEmbed(settings, "settings_discordlink", { user: this.user.globalName || "Desconhecido" });
    const buttons = ["dcl_embed", "dcl_logs", "dcl_servers"].map(buttonName => getButton(settings, buttonName));
    const components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)
    ];

    if (interaction.isButton()) {
      await interaction.update({
        embeds: [embed],
        components: components
      });
    } else if (interaction.isSelectMenu()) {
      await interaction.update({
        embeds: [embed],
        components: components
      });
    }
  }

  private async handleSelectMenu(select: SelectMenuInteraction) {
    const { values } = select;
    const option = values[0];

    if (option === "settings:discordlink") {
      await this.updateSettingsPage(select);
    } else {
      await select.reply({ content: `A função ${option} não está habilitada.` });
    }
  }

  private async handleChannelSelectMenu(channel: ChannelSelectMenuInteraction) {
    const { values } = channel;

    mysql.update("discord_link", { logs: values[0] }, [{ guildid: this.guild.id }]);

    await this.updateSettingsPage(channel);
  }

  private async handleButtonInteraction(button: ButtonInteraction) {
    const { customId } = button;

    if (customId.includes("dcl_logs")) {
      const embedLogs = getEmbed(settings, "dcl_logs", { user: this.user.globalName || "Desconhecido" });
      const selectLogs = getSelect(settings, "dcl_select_logs");

      await button.update({
        embeds: [embedLogs],
        components: [new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(selectLogs)]
      });
    } else if (customId.includes("dcl_embed")) {
      const modalEmbed = getModal("dcl_embed_modal");
      button.showModal(modalEmbed);
    } else {
      await button.reply({ content: `A função ${customId} não está habilitada.` });
    }
  }
}




/*
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

                select.edit({
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

            channel.edit({
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

                buttons.edit({
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
*/