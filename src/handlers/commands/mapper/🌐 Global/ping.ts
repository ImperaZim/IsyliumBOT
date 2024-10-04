import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { MercadoPagoConfig, PaymentMethod, Preference } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import { Builder } from 'pterodactyl.js';

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {







  }
});