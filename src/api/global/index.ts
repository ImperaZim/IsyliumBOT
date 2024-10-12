import * as fs from "fs";
import * as path from "path";
import express from 'express';

export function startExpress() {
  const app = express()
  const directoryPath = '/var/lib/pterodactyl/volumes/67471a7a-a910-4148-8ee5-e67d9fdb8a3d/plugin_data/ProjectHarvest/players';

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.post('/notification/receive', (req, res) => {
    const json = req.body;

    if (!json) {
      return res.status(400).json({ error: 'Json não foi fornecido' });
    }

    res.status(200).json({ message: 'Notificação recebida com sucesso', data: json });
    console.log(JSON.parse(json));
  });


  app.listen(19134)
}