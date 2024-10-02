import { EventType } from "@types";
import { ClientEvents } from "discord.js";

export class ExtendedEvent<Key extends keyof ClientEvents> {
  constructor(options: EventType<Key>) {
    Object.assign(this, options);
  }
}
