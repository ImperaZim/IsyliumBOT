import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import mercadopago from 'mercadopago';
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

    mercadopago.configure({
      access_token: payment.acesstoken
    });

    var preference = {
      items: [
        {
          title: 'Test',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 10.5
        }
      ]
    };

    const a = mercadopago.preferences.create(preference).then(console.log)
  }
});