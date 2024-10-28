import dotenv from 'dotenv';
import { Interaction } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

const API_URL: string = 'http://api.isylium.cloud:3000/harvest';

export class HarvestConnection {

  private static getPassword(): string {
    dotenv.config();
    const password = process.env.PASSWORD;
    if (!password) {
      throw new Error('PASSWORD não definido nas variáveis de ambiente');
    }
    return password;
  }

  public static async getPlayerByToken(token: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(API_URL, {
        password: this.getPassword(),
        request: 'getPlayerByToken()',
        params: {
          discordToken: token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter o jogador pelo token:', error);
      throw error;
    }
  }
}
