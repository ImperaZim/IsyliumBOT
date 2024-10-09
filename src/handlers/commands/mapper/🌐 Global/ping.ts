import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { MercadoPagoConfig, PaymentMethod, Preference } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import { Client, Application } from'jspteroapi';

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    const dash = "https://dash.isylium.cloud"
//const application = new Application('HOST', 'TOKEN'); // for application API
// const client = new Client(dash, 'ptlc_XKtjwcPeZ6VvzL35D4WTUVyJwnRGzOAXWoGe3quVGPR');
// client.sendCommand('67471a7a', 'player 1').then((res) => console.log(res)) // res = Successfuly sent the command!

await new TranscriptGenerator().fetchAndCheckPlayerData("imperazim", "VdOND9")
  }
});