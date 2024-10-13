import { client } from "@main";
import { CommandProps } from "@types";
import { ExtendedCommand } from "@extensions";
import { TranscriptGenerator } from "@handlers/transcripts";
//import { Payments } from "@handlers/mercadopago"
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { ApplicationCommandType } from "discord.js";
import { Client, Application } from 'jspteroapi';
import { payment } from "@config";
import axios from 'axios';

export default new ExtendedCommand({
  name: "ping",
  description: "Verificar o ping do isylium",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }: CommandProps) {

    var data = JSON.stringify({
      "statement_descriptor": "IsyliumStore",
      "external_reference": "userid",
      "items": [
        {
          "id": "id",
          "title": "My Product",
          "unit_price": 0.1,
          "category_id": "categoriaid"
        }
      ],
      "payer": {
        "name": "nickname, username",
        "surname": "gold, 7000"
      },
      "payment_methods": {
        "excluded_payment_types": [],
        "excluded_payment_methods": [],
        "installments": 12
      }
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.mercadopago.com/checkout/preferences',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payment.acesstoken}`
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });


  }
});