import { ClientEvents } from "discord.js";
import { ExtendedClient } from '@extensions';

export type EventType<Key extends keyof ClientEvents> = {
  name: Key;
  once?: boolean;
  run(client: ExtendedClient, ...args: ClientEvents[Key]): any;
}