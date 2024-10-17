import {
  User,
  Guild,
  SelectMenuInteraction,
  ComponentType,
  ActionRowBuilder
} from 'discord.js';
import { 
  ButtonCollector, 
  SelectCollector, 
  ModalCollector, 
  getSelect, 
  getEmbed, 
  getButton, 
  getModal
  } from 'DiscordElementor';
import { client, mysql } from '@main';
const settings = "settings";
  
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

           select.edit({
            embeds: [embed_discordlink],
            components: components
          });
        }
    },
    ComponentType.StringSelect, 
      , 
      (select: SelectMenuInteraction) => select.user.id === user.id )
  }