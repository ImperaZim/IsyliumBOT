import {
  User,
  Guild,
  SelectMenuInteraction,
  ComponentType
} from 'discord.js';
import { 
  ButtonColletor, 
  SelectColletor, 
  ModalColletor, 
  getSelect, 
  getEmbed, 
  getButton, 
  getModal
  } from 'DiscordElementor';
import { client, mysql } from '@main';
  
  export function Responder(response: any, user: User, guild: Guild){
    new SelectColletor(response, 
    (select: SelectMenuInteraction ) => {
      
    },
    ComponentType.StringSelect, 
      60000, 
      (select: SelectMenuInteraction) => select.user.id === user.id )
  }