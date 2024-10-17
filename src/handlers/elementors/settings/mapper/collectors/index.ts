import {
  User,
  Guild,
  SelectMenuInteraction,
  ComponentType
} from 'discord.js';
import { 
  ButtonColletor, 
  SelectCollector, 
  ModalColletor, 
  getSelect, 
  getEmbed, 
  getButton, 
  getModal
  } from 'DiscordElementor';
import { client, mysql } from '@main';
  
  export function SettingsController(response: any, user: User, guild: Guild){
   return new SelectCollector(response, 
    (select: SelectMenuInteraction ) => {
      const { values, user } = select
      const options = values[0];
        if (options === "settings:discordlink") {
          const embed_discordlink = getEmbed(settings, "settings_discordlink", {
            user: user.globalName || "error 404",
          });
          const buttons = ["dcl_embed", "dcl_logs", "dcl_servers"].map((buttonName) => getButton(settings, buttonName));
          const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)
          const components = ([row] || []).map((ar) => ar.toJSON());

           select.reply({
            embeds: [embed_discordlink],
            components: components
          });
        }
    },
    ComponentType.StringSelect, 
      60000, 
      (select: SelectMenuInteraction) => select.user.id === user.id )
  }