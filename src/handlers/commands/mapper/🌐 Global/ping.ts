import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
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

    // Step 3: Initialize the API objectconst client = new MercadoPago({  accessToken: config.access_token });
const preference = new Preference(client);

const body = {
  items: [
    {
      id: '1234',
      title: 'Dummy Title',
      description: 'Dummy description',
      picture_url: 'http://www.myapp.com/myimage.jpg',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: 10,
    },
  ],
  marketplace_fee: 0,
  payer: {
    name: 'Test',
    surname: 'User',
    email: 'your_test_email@example.com',
  },
  additional_info: 'Discount: 12.00',
  auto_return: 'all',
  binary_mode: true,
  external_reference: '1643827245',
  marketplace: 'marketplace',
  operation_type: 'regular_payment',
  payment_methods: {
    default_payment_method_id: 'master',
    excluded_payment_types: [
      {
        id: 'ticket',
      },
    ],
    installments: 5,
    default_installments: 1,
  },
  statement_descriptor: 'Test Store',
};

const response = await preference.create({ body })
  .then(console.log).catch(console.log);

    
  }
});