import {
  Collection,
  ButtonInteraction,
  ApplicationCommandData,
  ModalSubmitInteraction,
  AutocompleteInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction,
  StringSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { ExtendedClient } from '@extensions';

export interface CommandProps {
  client: ExtendedClient;
  interaction: CommandInteraction;
  options: CommandInteractionOptionResolver;
}

type ComponentInteraction<T> = Collection<string, (interaction: T) => any>;

export type ComponentsButton = ComponentInteraction<ButtonInteraction>;
export type ComponentsSelect = ComponentInteraction<StringSelectMenuInteraction>;
export type ComponentsRoleSelect = ComponentInteraction<RoleSelectMenuInteraction>;
export type ComponentsChannelSelect = ComponentInteraction<ChannelSelectMenuInteraction>;
export type ComponentsUserSelect = ComponentInteraction<UserSelectMenuInteraction>;
export type ComponentsMentionSelect = ComponentInteraction<MentionableSelectMenuInteraction>;
export type ComponentsModal = ComponentInteraction<ModalSubmitInteraction>;

interface CommandComponents {
  modals?: ComponentsModal;
  buttons?: ComponentsButton;
  selects?: ComponentsSelect;
  roleselect?: ComponentsRoleSelect;
  userselect?: ComponentsUserSelect;
  channelselect?: ComponentsChannelSelect;
  mentionselect?: ComponentsMentionSelect;
}

export type CommandType = ApplicationCommandData &
  CommandComponents & {
    run(props: CommandProps): any;
    autoComplete?: (interaction: AutocompleteInteraction) => any;
  };

export type Command = Collection<string, CommandType>;