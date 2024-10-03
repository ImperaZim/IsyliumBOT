import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
import { MercadoPagoConfig, PaymentMethod, Payment } from 'mercadopago';
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



    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-6462663530067323-100302-1eb4b8ec5ae36bd96ec504f6d708b90b-779023770' });
//     const paymentMethods = new PaymentMethod(client);
// 
//     paymentMethods.get().then((result) => console.log(result))
//       .catch((error) => console.log(error));


const preference = new Payment(client);

Payment.create({
  body: {
    payment_methods: {
      excluded_payment_methods: [],
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
.then((response) => {
  const paymentLink = response.body.init_point;
  if (paymentLink) {
    console.log('Link de pagamento:', paymentLink);
  } else {
    console.error('Erro: init_point não encontrado na resposta:', response.body);
  }
})
.catch((error) => {
  console.error('Erro ao criar preferência:', error);
});


  }
});