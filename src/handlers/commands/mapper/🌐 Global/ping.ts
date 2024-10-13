import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { Payments } from "@handlers/mercadopago"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import { Client, Application } from 'jspteroapi';
import { mercadopago } from "@config";
import axios from 'axios';

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {
    //  const dash = "https://dash.isylium.cloud"
    //const application = new Application('HOST', 'TOKEN'); // for application API
    // const client = new Client(dash, 'ptlc_XKtjwcPeZ6VvzL35D4WTUVyJwnRGzOAXWoGe3quVGPR');
    // client.sendCommand('67471a7a', 'player 1').then((res) => console.log(res)) // res = Successfuly sent the command!







    

// Defina o token de acesso do Mercado Pago
const accessToken = mercadopago.acesstoken

// Função para criar uma preferência
async function criarPreferencia() {
  const url = 'https://api.mercadopago.com/checkout/preferences';

  const data = {
    items: [
      {
        title: 'Produto Teste',
        quantity: 1,
        unit_price: 100.0,
        currency_id: 'BRL',
      },
    ],
    payer: {
      email: 'support@isylium.cloud',
    }
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Preferência criada:', response.data);
  } catch (error) {
    console.error('Erro ao criar preferência:', error.response?.data || error.message);
  }
}

// Chama a função para criar a preferência
criarPreferencia();

  }
});