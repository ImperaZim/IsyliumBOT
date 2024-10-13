import axios, { AxiosRequestConfig } from 'axios';
import { User } from 'discord.js';

interface Item {
  id: string;
  title: string;
  description?: string;
  unit_price: number;
  category_id: string;
}

interface PaymentMethods {
  excluded_payment_types: string[];
  excluded_payment_methods: string[];
  installments: number;
}

interface Payer {
  name: string;
  surname: string;
}

interface PaymentPayload {
  statement_descriptor: string;
  external_reference: string;
  items: Item[];
  payer: Payer;
  payment_methods: PaymentMethods;
}

export class Payment {
  private acesstoken: string;

  constructor(acesstoken: string) {
    this.acesstoken = acesstoken;
  }

  public async createPayment(user: User, nickname: string, type: string, value: string): Promise<string | null> {
    const userId = user.id;
    const username = user.username;

    const data: PaymentPayload = {
      statement_descriptor: "IsyliumStore",
      external_reference: `IH-${userId}`,
      items: [
        {
          id: "123",
          title: "My Product",
          description: "Description of my product",
          unit_price: 0.1,
          category_id: "categoriaid"
        }
      ],
      payer: {
        name: `${nickname}, ${username}`,
        surname: `${type}, ${value}`
      },
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: 12
      }
    };

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.mercadopago.com/checkout/preferences',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.acesstoken}`
      },
      data: JSON.stringify(data)
    };

    try {
      const response = await axios(config);
      console.log(response)

      //   return response.data.init_point;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
