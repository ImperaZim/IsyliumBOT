import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import mercadopago, { MercadoPagoConfig, Preference } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import { Client, Application } from 'jspteroapi';

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
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-6462663530067323-100302-1eb4b8ec5ae36bd96ec504f6d708b90b-779023770' });

    const preference = new Preference(client);


    // Criar uma preferência
    const preferences = {
      items: [
        {
          title: 'Meu Produto',
          unit_price: 100,
          quantity: 1,
        },
      ],
    };

    // Enviar a preferência
    await preference.create({ preferences }).then(response => {
      console.log(response.body.init_point); // Link gerado para pagamento
    })
      .catch(error => {
        console.error(error);
      });




  }
});