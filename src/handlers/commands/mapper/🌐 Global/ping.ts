import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { MercadoPagoConfig, PaymentMethod, Preference } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import axios, { AxiosResponse } from 'axios';

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {


    // const channel = interaction.channel
    // 
    //     if (!channel || channel.type === 'GUILD_TEXT') {
    //       return interaction.reply({
    //         content: 'Este comando não pode ser usado em canais privados.',
    //         ephemeral: true,
    //       });
    //     }
    // const transcriptGenerator = new TranscriptGenerator(channel, {
    //       limit: -1, // Opção para obter todas as mensagens
    //       filename: 'transcript.html', // Nome do arquivo
    //       saveImages: true, // Inclui as imagens no arquivo HTML
    //     });
    // 
    //     try {
    //       // Gera a transcrição
    //       const transcript = await transcriptGenerator.generateTranscript();
    //       /*        await message.channel.send({  content: "Aqui está a transcrição:",
    //                 files: [transcript.attachment],
    //               });*/
    // 
    //       // Faz o upload da transcrição
    //       const response = await transcriptGenerator.uploadTranscript();
    //       if (response) {
    //         console.log(`Transcrição enviada com sucesso! Resposta do servidor: ${response}`);
    //       } else {
    //         console.loh('Houve um erro ao enviar a transcrição.');
    //       }
    //     } catch (error) {
    //       console.error('Erro ao gerar ou enviar transcrição:', error);
    //       console.log('Erro ao gerar ou enviar a transcrição.');
    //     }
    //   interaction.reply(`Pong! ${client.ws.ping}ms.`);



    // const client = new MercadoPagoConfig({ accessToken: 'APP_USR-6462663530067323-100302-1eb4b8ec5ae36bd96ec504f6d708b90b-779023770' });
    //     const paymentMethods = new PaymentMethod(client);
    // 
    //     paymentMethods.get().then((result) => console.log(result))
    //       .catch((error) => console.log(error));


    //     const preference = new Preference(client);
    // 
    // 
    // 
    //     async function criarPreferencia() {
    //       try {
    //         // Defina os itens da preferência de pagamento
    //         const preferences = {
    //           items: [
    //             {
    //               title: 'Produto Exemplo',
    //               quantity: 1,
    //               unit_price: 100, // Valor do produto em BRL
    //               currency_id: 'BRL',
    //             }
    //           ]
    //         };
    // 
    //         // Crie a preferência
    //         const response = await preference.create(preferences);
    // 
    //         // Extraia o link de pagamento da resposta
    //         const paymentLink = response.body.init_point;
    // 
    //         console.log("Link de pagamento:", paymentLink);
    //         return paymentLink;
    // 
    //       } catch (error) {
    //         console.error("Erro ao criar preferência:", error);
    //       }
    //     }
    // 
    //     // Chame a função para gerar o link de pagamento
    //     console.log(criarPreferencia());
    // 


    

// URL do endpoint da API do Pterodactyl
const url: string = "https://dash.isylium.cloud/api/client/servers/1a7ce997/command";

// Dados que serão enviados na requisição
interface CommandData {
  command: string;
}

const data: CommandData = {
  command: "help"
};

// Função para enviar o comando
async function sendCommand() {
  try {
    const response: AxiosResponse<any> = await axios.post(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer apikey', // Substitua 'apikey' pela sua chave real
        'cookie': 'pterodactyl_session=eyJpdiI6InhIVXp5ZE43WlMxUU1NQ1pyNWRFa1E9PSIsInZhbHVlIjoiQTNpcE9JV3FlcmZ6Ym9vS0dBTmxXMGtST2xyTFJvVEM5NWVWbVFJSnV6S1dwcTVGWHBhZzdjMHpkN0RNdDVkQiIsIm1hYyI6IjAxYTI5NDY1OWMzNDJlZWU2OTc3ZDYxYzIyMzlhZTFiYWY1ZjgwMjAwZjY3MDU4ZDYwMzhjOTRmYjMzNDliN2YifQ%253D%253D'
      }
    });
    
    // Manipule a resposta da API
    console.log('Resposta da API:', response.data);
  } catch (err) {
    // Manipule erros na requisição
    console.error('Erro na requisição:', err);
  }
}

// Chama a função para enviar o comando
sendCommand();


  }
});