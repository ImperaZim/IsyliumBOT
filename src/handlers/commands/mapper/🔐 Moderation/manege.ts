import { client, mysql } from "@main";
import { CommandProps } from "@types";
import { color } from "@config";
import { ExtendedCommand } from "@extensions";
import { GuildData } from "@handlers";
import { Logger, colors } from "Console";
import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Collection,
  ChannelSelectMenuBuilder,
  ChannelType,
  ComponentType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";

export default new ExtendedCommand({
  name: "manage",
  description: "Gerenciar sistemas do servidor",
  defaultMemberPermissions: "Administrator",
  options: [
    {
      name: "server",
      description: "Gerenciar sistemas do servidor",
      type: ApplicationCommandOptionType.Subcommand
    }
  ],
  type: ApplicationCommandType.ChatInput,
  async run({ interaction, options}: CommandProps) {
    try {
      if (client.user === null) return;
      if (!interaction.inCachedGuild()) return;
      const data = new CreateData(interaction.guild);
      const checkGuild = await data.checkGuildData();
      const username = client.user ? client.user.username : "";
      const displayAvatar = client.user
        ? client.user.displayAvatarURL() : "";
      
          if (checkGuild) {
               switch (options.getSubcommand(true)) {
               case "server":
                 {
                   interaction.reply({ content: "a" })
                 }
               }
          }
      //               const embed = new EmbedBuilder()
      //                 .setAuthor({
      //                   name: username,
      //                   iconURL: displayAvatar
      //                 })
      //                 .setThumbnail(displayAvatar)
      //                 .setDescription(
      //                   `Olá ${interaction.user.globalName} logo abaixo está todos os meus sistemas disponíveis para moderação aproveite`
      //                 )
      //                 .setColor(blue);
      // 
      //               const selectmenu =
      //                 new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      //                   new StringSelectMenuBuilder()
      //                     .setCustomId("settings:guild")
      //                     .setPlaceholder("Opções")
      //                     .addOptions(
      //                       {
      //                         label: "ticket",
      //                         emoji: "<:ticket:1141577787040350260>",
      //                         value: "settings:ticket"
      //                       },
      //                       {
      //                         label: "Permissões",
      //                         emoji: "🔒",
      //                         value: "settings:permissions"
      //                       }
      //                     )
      //                 );
      //               var reply = await interaction.reply({
      //                 embeds: [embed],
      //                 components: [selectmenu],
      //                 fetchReply: true
      //               });
      //               new EmbedCollector(
      //                 reply,
      //                 async (select: any) => {
      //                   const { values, user } = select;
      //                   if (user.id != interaction.user.id) {
      //                     await select.reply({
      //                       content: `Você não tem permissão de mexer aqui, mocinho`,
      //                       ephemeral: true
      //                     });
      //                     return;
      //                   }
      //                   const options = values[0];
      //                   switch (options) {
      //                     case "settings:ticket":
      //                       {
      //                         const user = interaction.user;
      //                         const replyData = getReply(
      //                           "ticket",
      //                           {
      //                             user:
      //                               user.globalName ||
      //                               "error 404"
      //                           }
      //                         );
      //                         if (replyData) {
      //                           await reply.edit({
      //                             embeds: replyData.embed,
      //                             components:
      //                               replyData.components
      //                           });
      //                         }
      //                       }
      //                       break;
      //                   }
      //                 },
      //                 ComponentType.StringSelect
      //               );
      //               new EmbedCollector(
      //                 reply,
      //                 async (button: any) => {
      //                   const { customId, user, guild } = button;
      //                   if (user.id != interaction.user.id) {
      //                     await button.reply({
      //                       content: `Você não tem permissão de mexer aqui, mocinho`,
      //                       ephemeral: true
      //                     });
      //                     return;
      //                   }
      //                   if (customId === "embed:edit") {
      //                     const modal = new ModalBuilder({
      //                       customId: "embed:builder",
      //                       title: "Criador de embed",
      //                       components: [
      //                         new ActionRowBuilder<TextInputBuilder>(
      //                           {
      //                             components: [
      //                               new TextInputBuilder(
      //                                 {
      //                                   customId:
      //                                     "embed:builder_json",
      //                                   label: "Embed JSON:",
      //                                   placeholder:
      //                                     '{\n "title": "teste"\n}',
      //                                   maxLength: 4000,
      //                                   style: TextInputStyle.Paragraph,
      //                                   required:
      //                                     true
      //                                 }
      //                               )
      //                             ]
      //                           }
      //                         )
      //                       ]
      //                     });
      // 
      //                     await button.showModal(modal);
      //                   }
      //                   const embedresult = getButton(customId, {
      //                     user: user.globalName || "error 404"
      //                   });
      //                   if (
      //                     embedresult &&
      //                     embedresult.reply &&
      //                     embedresult.reply.embed &&
      //                     embedresult.reply.components
      //                   )
      //                     await reply.edit({
      //                       embeds: embedresult.reply.embed,
      //                       components:
      //                         embedresult.reply.components
      //                     });
      //                 },
      //                 ComponentType.Button
      //               );
      //             }
      //             break;
      //         }
      //       } else {
      //         await data.GuildCreateData();
      //         interaction.reply({
      //           content:
      //             "Infelizmente eu não achei sua guilda em meus bancos de dados, e eu tomei a liberdade de adicionar sua guilda por favor de comando novamente !!",
      //           ephemeral: true
      //         });
      //       }
    } catch (error) {
      new Logger("null", {
        title: colors.red("[Command Manage]"),
        content: `Erro ao executar: ${error}`
      });
    }
  }
});