import { PASSWORD } from '@api';
import { Interaction } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

const API_URL: string = 'http://api.isylium.cloud:3000/harvest';

export class HarvestConnection {

  public static async getPlayerByToken(token: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(API_URL, {
        password: PASSWORD,
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

  public static async getPlayerByName(name: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(API_URL, {
        password: PASSWORD,
        request: 'getPlayerByName()',
        params: {
          playerName: name
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter o jogador pelo token:', error);
      throw error;
    }
  }
  
  //sendgift
  
  public static async define(name: string, key: string, value: any): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(API_URL, {
        password: PASSWORD,
        request: 'define()',
        params: {
          playerName: name,
          key: key,
          value: value
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter o jogador pelo token:', error);
      throw error;
    }
  }
}
