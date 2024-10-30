import axios from 'axios';
import express from 'express';
import { config } from "dotenv";
import { mercadopago } from "@config";
import { HarvestConnection } from "@api/harvest";

config({ path: '.env' });

function verifyPassword(password) {
  config({ path: '.env' });
  return password === process.env.PASSWORD;
}

export function startExpress() {

  const app = express();
  app.use(express.json());

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
        var [nickname, username] = user.split(", ");
        var [type, value] = types.split(", ");

        if (status === 'approved') {
          HarvestConnection.sendGift(nickname, type, value);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  app.post('/notify', async (req, res) => {
    const { password, params } = req.body;

    if (!verifyPassword(password)) {
      return res.status(401).json({ message: 'Incorrect password!', data: [password, process.env.PASSWORD] });
    }

    if (!params) {
      return res.status(401).json({ message: 'Require params!' });
    }

    if (!params.type) {
      return res.status(401).json({ message: 'Require params[type]!' });
    }

    if (!params.data) {
      return res.status(401).json({ message: 'Require params[data]!' });
    }

    switch (params.type) {
      case 'ban':
        console.log(params.data);
        break;
      case 'kick':
        console.log(params.data);
        break;
      case 'mute':
        console.log(params.data);
        break;
      default:
        console.log(`${params.type} not's valid type!`);
        break;
    }

    res.json({ message: 'Pass!' });
  });

  app.listen(19134, () => { });
}