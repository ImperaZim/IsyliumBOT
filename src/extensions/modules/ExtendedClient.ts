import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  Client,
  Partials,
  Collection,
  ActivityType,
  IntentsBitField,
  ButtonInteraction,
  BitFieldResolvable,
  GatewayIntentsString,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction,
  StringSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
  ApplicationCommandDataResolvable,
} from "discord.js";
import {
  Command,
  EventType,
  BuilderData,
  CommandType,
  ClientEvents,
  ComponentsModal,
  ComponentsButton,
  ComponentsSelect,
  ComponentsRoleSelect,
  ComponentsUserSelect,
  ComponentsChannelSelect,
  ComponentsMentionSelect,
} from "@types";
import { discord } from "@config";
import { Logger, colors } from "Console";

// Função auxiliar para filtrar arquivos .ts
export const filter = (file: string) => file.endsWith(".ts");

/**
 * Custom Discord.js client class.
 */
export class ExtendedClient extends Client {
  public filter: any = filter;
  public builders: BuilderData = {};
  public commands: Command = new Collection();
  public modals: ComponentsModal = new Collection();
  public buttons: ComponentsButton = new Collection();
  public selects: ComponentsSelect = new Collection();
  public roleselect: ComponentsRoleSelect = new Collection();
  public userselect: ComponentsUserSelect = new Collection();
  public channelselect: ComponentsChannelSelect = new Collection();
  public mentionselect: ComponentsMentionSelect = new Collection();

  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
        GatewayIntentsString,
        number
      >,
      partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent,
      ],
    });
  }

  /**
   * Initialize the client.
   */
  public initialize(): void {
    this.login(discord.token);
    this.initializeAll();
  }

  /**
   * Initialize all components.
   */
  public initializeAll(): void {
    this.registerEvents();
    this.registerModules();
    this.on("ready", () => {
      if (this.user) {
        this.user.setActivity("????", {
          type: ActivityType.Playing,
        });
      }
    });
  }

  /**
   * Register commands.
   */
  private async registerCommands(
    commands: ApplicationCommandDataResolvable[]
  ): Promise<void> {
    try {
      await this.application?.commands.set(commands);
      new Logger("null", {
        title: colors.cyanBright("[ISYLIUM CALL]"),
        content: "Comandos carregados com sucesso!",
      });
    } catch (error) {
      new Logger("null", {
        title: colors.red("[ISYLIUM MODULES]"),
        content: `❌ An error occurred while setting Slash Commands (/): \n${error}`,
      });
    }
  }

  /**
   * Register modules and commands.
   */
  private registerModules(): void {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const commandsPath = join(__dirname, "..", "..", "handlers", "commands", "mapper");

    if (fs.existsSync(commandsPath)) {
      fs.readdirSync(commandsPath).forEach((local) => {
        const localPath = join(commandsPath, local);
        if (fs.existsSync(localPath)) {
          fs.readdirSync(localPath)
            .filter(filter)
            .forEach(async (fileName) => {
              const command: CommandType = (
                await import(join(localPath, fileName))
              )?.default;

              if (command?.name) {
                this.commands.set(command.name, command);
                slashCommands.push(command);
                this.registerCommandComponents(command);
              }
            });
        }
      });

      new Logger("null", {
        title: colors.cyanBright("[ISYLIUM CALL]"),
        content: "Eventos carregados com sucesso!",
      });
      this.on("ready", () => this.registerCommands(slashCommands));
    }
  }

  /**
   * Helper function to register command components (buttons, selects, etc.).
   */
  private registerCommandComponents(command: CommandType): void {
    const {
      buttons,
      selects,
      modals,
      roleselect,
      channelselect,
      userselect,
      mentionselect,
    } = command;

    buttons?.forEach((run, key) => this.buttons.set(key, run));
    selects?.forEach((run, key) => this.selects.set(key, run));
    modals?.forEach((run, key) => this.modals.set(key, run));
    roleselect?.forEach((run, key) => this.roleselect.set(key, run));
    channelselect?.forEach((run, key) => this.channelselect.set(key, run));
    userselect?.forEach((run, key) => this.userselect.set(key, run));
    mentionselect?.forEach((run, key) => this.mentionselect.set(key, run));
  }

  /**
   * Register events.
   */
  private async registerEvents(): Promise<void> {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const eventsPath = join(__dirname, "..", "..", "handlers", "events", "mapper");

    if (fs.existsSync(eventsPath)) {
      const localDirectories = fs.readdirSync(eventsPath);
      await Promise.all(
        localDirectories.map(async (local) => {
          const localPath = join(eventsPath, local);
          if (fs.existsSync(localPath)) {
            const files = fs.readdirSync(localPath).filter(filter);
            await Promise.all(
              files.map(async (fileName) => {
                await this.processEventFile(local, fileName);
              })
            );
          }
        })
      );
    }
  }

  /**
   * Helper function to process and register event files.
   */
  private async processEventFile(local: string, fileName: string): Promise<void> {
    const event: EventType<keyof ClientEvents> = (
      await import(`../../handlers/events/mapper/${local}/${fileName}`)
    )?.default;

    if (event?.name) {
      const handler = (...args: any[]) => event.run(this, ...args);
      event.once ? this.once(event.name, handler) : this.on(event.name, handler);
    }
  }
}