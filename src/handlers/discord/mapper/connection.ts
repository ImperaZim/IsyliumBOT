import axios from 'axios';

interface PlayerDataResponse {
  metadata?: string;
}


interface DocodedMetadata {
  [key: string]: any;
}

export class Connection {
  
  public async fetchAndCheckPlayerData(expectedToken: string, expectedUsername: string, nickname: string): Promise<void> {
    try {
      
      const url = `http://dash.isylium.cloud:3000/harvest/getplayerdata/${nickname}`;
      const response = await axios.get<PlayerDataResponse>(url);
      
      const data = response.data;
      if (!data.metadata) {
        console.log('Falha: não existe metadata na resposta JSON!');
        return;
      }

      const decodedMetadata: DocodedMetadata = JSON.parse(atob(data.metadata));

      const tokenMatches = decodedMetadata.discord_token === expectedToken;
      const usernameMatches = decodedMetadata.discord_username === expectedUsername;

      if (tokenMatches && usernameMatches) {
        console.log('Sucesso: discord_token e discord_username correspondem aos esperados!');
      } else {
        console.log('Falha: discord_token ou discord_username não correspondem aos esperados.');
      }
    } catch (error) {
      console.error('Erro ao buscar ou verificar os dados:', (error as Error).message);
    }
  }
}
