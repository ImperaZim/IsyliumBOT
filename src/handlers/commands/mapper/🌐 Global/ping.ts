import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import mercadopago from 'mercadopago';
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




    // Configurar Mercado Pago com o token de acesso
    mercadopago.configurations.setAccessToken('APP_USR-6462663530067323-100302-1eb4b8ec5ae36bd96ec504f6d708b90b-779023770');

    // Criar uma preferência
    const preference = {
      items: [
        {
          title: 'Meu Produto',
          unit_price: 100,
          quantity: 1,
        },
      ],
    };

    // Enviar a preferência
    mercadopago.preferences.create(preference)
      .then(response => {
        console.log(response.body.init_point); // Link gerado para pagamento
      })
      .catch(error => {
        console.error(error);
      });




  }
});