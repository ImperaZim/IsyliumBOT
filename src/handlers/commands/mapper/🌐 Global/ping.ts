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
      "statement_descriptor": "TestStore",
      "external_reference": "IWD1238971",
      "items": [
        {
          "id": "010983098",
          "title": "My Product",
          "quantity": 1,
          "unit_price": 2000,
          "description": "Description of my product",
          "category_id": "retail"
        }
      ],
      "payer": {
        "email": "test_user_12398378192@testuser.com",
        "name": "Juan",
        "surname": "Lopez"
      },
      "payment_methods": {
        "excluded_payment_types": [],
        "excluded_payment_methods": [],
        "installments": 12,
        "default_payment_method_id": "pix"
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