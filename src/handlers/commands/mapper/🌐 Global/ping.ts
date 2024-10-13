import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payment } from "@handlers/mercadopago"
import { ApplicationCommandType } from "discord.js";
import { Client, Application } from 'jspteroapi';
import { mercadopago} from "@config";
import axios from 'axios';

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    
const pay = await new Payment(mercadopago.acesstoken);
 await pay.createPayment(interaction.user, "yBriisMC", "gold", "10000")


  }
});