import axios from 'axios';

export class connection {
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