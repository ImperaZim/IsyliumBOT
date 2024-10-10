import axios from 'axios';
import { Interaction } from 'discord.js';

interface PlayerDataResponse {
  metadata?: string;
}


interface DocodedMetadata {
  [key: string]: any;
}

export class Connection {

  public async fetchAndCheckPlayerData(
    interaction: Interaction,
    expectedToken: string,
    expectedUsername: string,
    nickname: string,
    server: string): Promise<void> {
    try {

      if (!interaction.isRepliable()) return;

      const dash = "http://dash.isylium.cloud:3000"
      const url = `${dash}/harvest/getplayerdata/${nickname}`;
      const response = await axios.get<PlayerDataResponse>(url);

      const data = response.data;
      if (!data.metadata) {
        console.log('Falha: não existe metadata na resposta JSON!');
        return;
      }

      const decodedMetadata: DocodedMetadata = JSON.parse(atob(data.metadata));

      if (!decodedMetadata.discord_link_status) {
        return;
      }

      const tokenMatches = decodedMetadata.discord_token === expectedToken;
      const usernameMatches = decodedMetadata.discord_username === expectedUsername;

      if (tokenMatches && usernameMatches) {
        const url = `${dash}/harvest/linkplayer/${nickname}`;
        const response = await axios.get(url);
        interaction.reply({ content: '<:corrector:1293816417984184352> Sua conta foi vinculada ao servidor ${server} com sucesso!.', ephemeral: true });
      } else {
        interaction.reply({ content: '<:corrector:1293816417984184352> Sua conta foi não foi vinculada ao servidor ${server} ja existe cadastro!.', ephemeral: true });
      }
    } catch (error) {
      console.error('Erro ao buscar ou verificar os dados:', (error as Error).message);
    }
  }
}
