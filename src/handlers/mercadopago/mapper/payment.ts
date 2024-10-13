import axios, { AxiosRequestConfig } from 'axios';
import { User } from 'discord.js';

export class Payment {
  private acesstoken: string;

  constructor(acesstoken: string) {
    this.acesstoken = acesstoken;
  }

  public async createPayment(user: User, nickname: string, type: string, value: string): Promise<string | null> {
    const userId = user.id;
    const username = user.username;

    const data = JSON.stringify({
      "statement_descriptor": "IsyliumStore",
      "external_reference": `${userId}`,
      "items": [
        {
          "id": "010983098",
          "title": "My Product",
          "quantity": 1,
          "unit_price": 0.1,
          "category_id": "retail"
        }
      ],
      "payer": {
        "name": `${nickname}, ${username} `,
        "surname": `${type}, ${value}`,
      },
      "payment_methods": {
        "excluded_payment_types": [],
        "excluded_payment_methods": [],
        "installments": 12,
      }
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.mercadopago.com/checkout/preferences',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.acesstoken}`
      },
      data: data
    };

    try {
      const response = await axios(config);
  //    return response.data.init_point;
      console.log(JSON.stringify(response))
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
