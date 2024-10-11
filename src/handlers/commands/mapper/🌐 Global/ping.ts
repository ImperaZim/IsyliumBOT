import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Connection } from "@handlers/discord"
import { MercadoPagoConfig, PaymentMethod } from 'mercadopago';
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
    
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-6462663530067323-100302-1eb4b8ec5ae36bd96ec504f6d708b90b-779023770' });
      const paymentMethods = new PaymentMethod(client);
    
         paymentMethods.get().then((result) => console.log(result))
        .catch((error) => console.log(error));
  }
});