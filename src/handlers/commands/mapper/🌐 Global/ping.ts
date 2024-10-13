import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import { Client, Application } from 'jspteroapi';
import { mercadopago } from "@config";

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    //  const dash = "https://dash.isylium.cloud"
    //const application = new Application('HOST', 'TOKEN'); // for application API
    // const client = new Client(dash, 'ptlc_XKtjwcPeZ6VvzL35D4WTUVyJwnRGzOAXWoGe3quVGPR');
    // client.sendCommand('67471a7a', 'player 1').then((res) => console.log(res)) // res = Successfuly sent the command!







    const body = {
      items: [
        {
          title: 'My product',
          quantity: 1,
          unit_price: 2000
        }
      ],
      payer: {
        name: 'Test',
        surname: 'User',
        email: 'your_test_email@example.com',
        phone: {
          area_code: '11',
          number: '4444-4444',
        },
        address: {
          zip_code: '06233200',
          street_name: 'Street',
          street_number: 123,
        },
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          },
          {
            id: "elo"
          },
          {
            id: "hipercard"
          },
          {
            id: "bolbradesco"
          },
          {
            id: "pec"
          }
        ],
        excluded_payment_types: [],
        installments: 5
      }
    };



    // Configurar Mercado Pago com o token de acesso
    const client = new MercadoPagoConfig({ accessToken: mercadopago.acesstoken });

    const preference = new Preference(client);

    preference.create({
      body: {
        items: [
          {
            id: '2000',
            title: 'gold',
            quantity: 1,
            unit_price: 0.1
          }
        ],
      }
    }).then(console.log).catch(console.log);




  }
});