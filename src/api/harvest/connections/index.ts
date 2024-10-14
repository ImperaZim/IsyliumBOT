import axios from 'axios';
import { Interaction } from 'discord.js';

import {
  DecodedMetadata,
  MessageCallback,
  PlayerDataResponse
} from '@types';
import {
  getPlayerNickname,
  insertPlayerRecord
} from '..';
import { routes } from '..';
import { handleCallback } from '..';

export class HarvestConnection {

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
        return handleCallback(interaction, onFailure, 'Metadata ausente nos dados retornados!');
      }

      const decodedMetadata: DecodedMetadata = JSON.parse(atob(data.metadata));

      if (decodedMetadata.discord_link_status) {
        return handleCallback(
          interaction,
          onAlreadyLinked,
          `Sua conta já está vinculada ao servidor Harvest. Já existe um cadastro associado!`
        );
      }

      const tokenMatches = decodedMetadata.discord_token === expectedToken;
      const usernameMatches = decodedMetadata.discord_username === expectedUsername;

      if (tokenMatches && usernameMatches) {
        await axios.get(routes.setLinkPlayer(nickname));
        await insertPlayerRecord(interaction.user.username, nickname);
        handleCallback(interaction, onSuccess, 'Sua conta foi vinculada ao servidor Harvest com sucesso!');
      } else {
        handleCallback(interaction, onFailure, 'Verifique o token ou username e tente novamente!');
      }
    } catch (error) {
      console.error('Erro ao buscar ou verificar os dados:', (error as Error).message);
      handleCallback(interaction, onFailure, 'Erro ao conectar-se ao servidor. Tente novamente mais tarde.');
    }
  }

  public async sendPlayerGift(
    nickname: string,
    giftType: string,
    giftValue: string
  ): Promise<boolean> {
    try {
      // const player = await getPlayerNickname(userId);
      //       if (!player) {
      //         return false;
      //       }

      await axios.get(routes.addPlayerGift(nickname, giftType, giftValue));
      return true;
    } catch (error) {
      console.error('Erro ao buscar ou verificar os dados:', (error as Error).message);
      return false;
    }
  }
}