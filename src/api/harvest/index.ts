import axios from 'axios';
import { GLOBAL_URL } from '@api';
import { Interaction } from 'discord.js';
import {
  DynamicRoutes,
  DecodedMetadata,
  MessageCallback,
  PlayerDataResponse
} from "@types";

export const routes: DynamicRoutes = {
  getPlayerData(playerName: string): string {
    return `${GLOBAL_URL}/harvest/getplayerdata/${playerName}`;
  },
  setLinkPlayer(playerName: string): string {
    return `${GLOBAL_URL}/harvest/linkplayer/${playerName}`;
  },
};

export class IsyliumConnection {

  public async checkServerConnection(
    interaction: Interaction,
    expectedToken: string,
    expectedUsername: string,
    nickname: string,
    onSuccess?: MessageCallback,
    onFailure?: MessageCallback,
    onAlreadyLinked?: MessageCallback
  ): Promise<void> {
    try {
      if (!interaction.isRepliable()) return;

      const response = await axios.get<PlayerDataResponse>(
        routes.getPlayerData(nickname)
      );

      const data = response.data;
      if (!data.metadata) {
        console.log('Falha: não existe metadata na resposta JSON!');
        return this.handleCallback(
          interaction,
          onFailure,
          'Metadata ausente nos dados retornados!'
        );
      }

      const decodedMetadata: DecodedMetadata = JSON.parse(atob(data.metadata));

      if (decodedMetadata.discord_link_status) {
        return this.handleCallback(
          interaction,
          onAlreadyLinked,
          `Sua conta já está vinculada ao servidor Harvest. Já existe um cadastro associado!`
        );
      }

      const tokenMatches = decodedMetadata.discord_token === expectedToken;
      const usernameMatches = decodedMetadata.discord_username === expectedUsername;

      if (tokenMatches && usernameMatches) {
        await axios.get(routes.setLinkPlayer(nickname));
        this.handleCallback(
          interaction,
          onSuccess,
          `Sua conta foi vinculada ao servidor Harvest com sucesso!`
        );
      } else {
        this.handleCallback(
          interaction,
          onFailure,
          'Verifique o token ou username e tente novamente!'
        );
      }
    } catch (error) {
      console.error('Erro ao buscar ou verificar os dados:', (error as Error).message);
      this.handleCallback(
        interaction,
        onFailure,
        'Erro ao conectar-se ao servidor. Tente novamente mais tarde.'
      );
    }
  }

  private async handleCallback(
    interaction: Interaction,
    callback: MessageCallback | undefined,
    defaultMessage: string
  ): Promise<void> {
    if (callback) {
      await callback(interaction, defaultMessage);
    } else {
      o
      await interaction.reply({ content: defaultMessage, ephemeral: true });
    }
  }
}