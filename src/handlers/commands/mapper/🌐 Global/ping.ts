import { client } from "@maim";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@@extensions";
import { ApplicationCommandType } from "discord.js";

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    interaction.reply(`Pong! ${client.ws.ping}ms.`);
  }
});