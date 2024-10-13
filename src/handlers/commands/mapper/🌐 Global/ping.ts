import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import { MercadoPagoConfig, Preference } from 'mercadopago';
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
    

        

        const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

        const preference = new Preference(client);

        preference.create({
          body: {
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
          installments: 12
},
            items: [
              {
                title: 'My product',
                quantity: 1,
                unit_price: 2000
              }
            ],
          }
        })
        .then(console.log)
        .catch(console.log);
       

  }
});