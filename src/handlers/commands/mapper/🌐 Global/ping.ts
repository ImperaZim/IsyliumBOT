import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
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
    
    const email = 'user@example.com'; // Substitua pelo email do usuário
const name = 'Nome do Usuário'; // Substitua pelo nome do usuário
const paymentProcessor = new Payments(email, name);

async function processPayment() {
    try {
        const amount = 100; // Valor em reais
        const description = 'Descrição do produto ou serviço';
        const paymentMethod: PaymentMethod = 'visa'; // Altere para 'visa', 'master' ou 'account_money' conforme necessário

        const paymentInfo = await paymentProcessor.generatePayment(amount, description, paymentMethod);

        // Exibe QR Code ou link de pagamento
        if (paymentMethod === 'pix') {
            console.log('QR Code gerado:', paymentInfo.qrCodeBase64);
            console.log('ID do pagamento:', paymentInfo.paymentId);
        } else {
            console.log('Link para pagamento:', paymentInfo.paymentLink);
        }
    } catch (error) {
        console.error(error);
    }
}

processPayment();

  }
});