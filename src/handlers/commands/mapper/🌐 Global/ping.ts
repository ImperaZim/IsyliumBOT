import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import { Client, Application } from 'jspteroapi';
import { payment } from "@config";
import axios from 'axios';

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {


    // Função para criar uma preferência



    // Step 2: Initialize the client object
    const client = new MercadoPagoConfig({ accessToken: payment.acesstoken, options: { timeout: 5000 } });

    // Step 3: Initialize the API object
    const payments = new Payment(client);

    // Step 4: Create the request object
    const body = {
      transaction_amount: 12.34,
      description: 'a',
      payer: {
        email: 'ybriismc@gmail.com'
      },
    };

    // Step 5: Create request options object - Optional


    // Step 6: Make the request
    payments.create({ body }).then(console.log).catch(console.log);
  }
});