import * as fs from "fs";
import * as path from "path";
import express from 'express';
import axios from 'axios';
import { payment } from "@config";

export function startExpress() {
  const app = express();

  // Middleware para interpretar JSON no corpo da requisição
  app.use(express.json());

  const directoryPath = '/var/lib/pterodactyl/volumes/67471a7a-a910-4148-8ee5-e67d9fdb8a3d/plugin_data/ProjectHarvest/players';

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  app.post('/notification/receive', (req, res) => {
    const json = req.body;

    if (!json) {
      return res.status(400).json({ error: 'Json não foi fornecido' });
    }

    res.status(200).json({ message: 'Notificação recebida com sucesso', data: json });


    // var config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: 'https://api.mercadopago.com/v1/payments/:paymentId',
//       headers: {
//         Authorization: `Bearer ${payment.acesstoken}`
//       },
//     };
// 
//     axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

    console.log(json.data.body.id);  // Aqui não é necessário parsear novamente, já é um objeto
  });

  app.listen(19134, () => {
    console.log('Servidor rodando na porta 19134');
  });
}
