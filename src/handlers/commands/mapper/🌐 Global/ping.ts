import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { MercadoPagoConfig, PaymentMethods } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";

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
    
    

const client = new MercadoPagoConfig({ accessToken: 'TEST-8329234677809062-100302-32e1b10c142778e6a02265577d802e4f-779023770' });
const paymentMethods = new PaymentMethods(client);

paymentMethods.get().then((result) => console.log(result))
  .catch((error) => console.log(error));

        
  }
});