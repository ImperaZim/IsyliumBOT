import axios from 'axios';
import FormData from 'form-data';
import { TranscriptOptions } from "@types";
import { Channel, User, Role } from 'discord.js';
import * as discordTranscripts from 'discord-html-transcripts';

export class TranscriptGenerator {
  private channel: Channel;
  private options: TranscriptOptions;

  constructor(channel: Channel, options: TranscriptOptions = {}) {
    this.channel = channel;
    this.options = {
      limit: options.limit ?? -1,
      returnType: options.returnType ?? 'attachment',
      filename: options.filename ?? 'transcript.html',
      saveImages: options.saveImages ?? false,
      footerText: options.footerText ?? "Exported {number} message{s}",
      poweredBy: options.poweredBy ?? true,
      ssr: options.ssr ?? true,
      callbacks: options.callbacks ?? {},
    };
  }

  /**
   * Creates a transcript of the specified channel with the given options.
   */
  public async generateTranscript(): Promise<any> {
    try {
      const attachment = await discordTranscripts.createTranscript(this.channel, {
        limit: this.options.limit,
        returnType: this.options.returnType,
        filename: this.options.filename,
        saveImages: this.options.saveImages,
        footerText: this.options.footerText,
        poweredBy: this.options.poweredBy,
        ssr: this.options.ssr,
        callbacks: this.options.callbacks,
      });

      return attachment;
    } catch (error) {
      console.error('Error generating transcript:', error);
      throw error;
    }
  }

  /**
   * Uploads the generated transcript to the specified endpoint.
   */
  public async uploadTranscript(): Promise<string | null> {
    try {
      // Gera a transcrição
      const transcript = await this.generateTranscript();

      // Verifica se o retorno é um buffer
      if (transcript && transcript.attachment) {
        const form = new FormData();
        // Anexa o buffer diretamente
        form.append('file', transcript.attachment, this.options.filename);

        // Envia o arquivo HTML gerado para o endpoint
        const response = await axios.post('https://dash.isylium.cloud/ticket/upload.php', form, {
          headers: {
            ...form.getHeaders(),
          },
        });

        return response.data;
      } else {
        throw new Error('Invalid transcript attachment');
      }
    } catch (error) {
      console.error('Error uploading transcript:', error);
      return null;
    }
  }

  public async fetchAndCheckPlayerData(expectedToken: string, expectedUsername: string) {
    try {
      // Faz a requisição GET para a URL
      const response = await axios.get('http://dash.isylium.cloud:3000/harvest/getplayerdata/ImperaZim');

      // Obtém os dados da resposta (assumindo que é um JSON direto, não mais base64)
      const data = response.data;

      if (!data.metadata) {
        console.log("Falha: não existe metadata na json passada!");
        return;
      }

      const metadata = data.metadata;
      const decodedMetadata = JSON.parse(atob(metadata));
      console.log(decodedMetadata)

      // Verifica se o `discord_token` e `discord_username` batem com os valores esperados
      if (decodedMetadata.discord_token && decodedMetadata.discord_username) {
        const tokenMatches = decodedMetadata.discord_token === expectedToken;
        const usernameMatches = decodedMetadata.discord_username === expectedUsername;

        if (tokenMatches && usernameMatches) {
          console.log('Sucesso: discord_token e discord_username correspondem aos esperados!');
        } else {
          console.log('Falha: discord_token ou discord_username não correspondem aos esperados.');
        }
      } else {
        console.log('Falha: discord_token ou discord_username não existem na json.');
      }
    } catch (error) {
      console.error('Erro ao buscar ou verificar os dados:', error.message);
    }
  }

  // Chama a função passando os valores esperados de discord_token e discord_username

}
