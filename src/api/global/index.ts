import * as fs from "fs";
import * as path from "path";
import express from 'express';
import axios from 'axios';
import { mercadopago } from "@config";

export function startExpress() {
  const app = express();

  // Middleware para interpretar JSON no corpo da requisição
  app.use(express.json());

  const directoryPath = '/var/lib/pterodactyl/volumes/67471a7a-a910-4148-8ee5-e67d9fdb8a3d/plugin_data/ProjectHarvest/players';

  app.get('/', function (req, res) {
    res.send('Isylium Response');
  });

  app.post('/notification/receive', (req, res) => {
    const json = req.body;

    if (!json) {
      return res.status(400).json({ error: 'Json não foi fornecido' });
    }

    res.status(200).json({ message: 'Notificação recebida com sucesso', data: json });


    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.mercadopago.com/v1/payments/${json.data.id}`,
      headers: {
        Authorization: `Bearer ${mercadopago.acesstoken}`
      },
    };

    axios(config)
      .then(function (response) {
        const status = response.data.status
        const user = response.data.additional_info.payer.first_name;
        const types = response.data.additional_info.payer.last_name;
        const [nickname, username] = user.split(", ");
        const [type, value] = types.split(", ");

        if (status === 'approved') {
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  app.listen(19134, () => {
  });
}
