import {
  User,
  Guild,
  SelectMenuInteraction,
  ButtonInteraction,
  RoleSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  ComponentType,
  ActionRowBuilder,
  ButtonBuilder,
  ChannelSelectMenuBuilder
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

export class SettingsController {
  private message: any;
  private user: User;
  private guild: Guild;

  constructor(message: any, user: User, guild: Guild) {
    this.message = message;
    this.user = user;
    this.guild = guild;
  }

  startCollectors() {
    this.initButtonInteraction(null, this.message);
    this.initSelectMenuInteraction(null, this.message);
    this.initChannelSelectMenuInteraction(null, this.message);
  }

  // SelectMenuInteraction
  private initSelectMenuInteraction(
    response: any = null,
    message: any = null
  ) {
    return new SelectCollector(
      (response === null ? message : response),
      async (select: SelectMenuInteraction) => {
        const { values, user } = select;
        const options = values[0];

        if (options === "settings:discordlink") {
          const embed_discordlink = getEmbed(
            settings,
            "settings_discordlink",
            { user: user.globalName || "error 404" }
          );

          const buttons = ["dcl_embed", "dcl_logs", "dcl_servers"].map(
            buttonName => getButton(settings, buttonName)
          );
          const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);
          const components = ([row] || []).map(ar => ar.toJSON());

          let newresponse;
          if (response == null) {
            newresponse = await message.edit({
              embeds: [embed_discordlink],
              components: components
            });
          } else {
            newresponse = await select.update({
              embeds: [embed_discordlink],
              components: components
            });
          }
          new SettingsController(newresponse, newresponse.user, newresponse.guild);
        }
      },
      ComponentType.StringSelect,
      time,
      (select: SelectMenuInteraction) => select.user.id === this.user.id
    );
  }

  // ChannelSelectMenuInteraction
  private initChannelSelectMenuInteraction(
    response: any = null,
    message: any = null
  ) {
    return new SelectCollector(
      (response === null ? message : response),
      async (channel: ChannelSelectMenuInteraction) => {
        const { values, user } = channel;

        mysql.update(
          "discord_link",
          { logs: values[0] },
          [{ guildid: this.guild.id }]
        );

        const embed_discordlink = getEmbed(
          settings,
          "settings_discordlink",
          { user: user.globalName || "error 404" }
        );

        const buttons = ["dcl_embed", "dcl_logs", "dcl_servers"].map(
          buttonName => getButton(settings, buttonName)
        );
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);
        const components = ([row] || []).map(ar => ar.toJSON());

        const newresponse = await channel.update({
          embeds: [embed_discordlink],
          components: components
        });
        new SettingsController(newresponse, channel.user, channel.guild);
      },
      ComponentType.ChannelSelect,
      time,
      (channel: ChannelSelectMenuInteraction) => channel.user.id === this.user.id
    );
  }

  // ButtonInteraction
  private initButtonInteraction(
    response: any = null,
    message: any = null
  ) {
    return new ButtonCollector(
      (response === null ? message : response),
      async (buttons: ButtonInteraction) => {
        const { customId, user, showModal } = buttons;
        const clicked = customId;

        // Discord Link - Logs
        if (clicked.includes("dcl_logs")) {
          const dcl_logs = getEmbed(settings, "dcl_logs", {
            user: user.globalName || "error 404"
          });

          const select_logs = getSelect(settings, "dcl_select_logs");
          const newresponse = await buttons.update({
            embeds: [dcl_logs],
            components: [
              new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
                [select_logs]
              )
            ]
          });
          new SettingsController(newresponse, newresponse.user, newresponse.guild);
        }

        // Discord Link - Embed Modal
        if (clicked.includes("dcl_embed")) {
          const modal_embed = getModal("dcl_embed_modal");
          showModal(modal_embed);
        }
      },
      ComponentType.Button,
      time,
      (button: ButtonInteraction) => button.user.id === this.user.id
    );
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