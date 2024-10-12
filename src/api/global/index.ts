import * as fs from "fs";
import * as path from "path";
import express from 'express';

export function startExpress() {
  const app = express()
  const directoryPath = '/var/lib/pterodactyl/volumes/67471a7a-a910-4148-8ee5-e67d9fdb8a3d/plugin_data/ProjectHarvest/players';

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/harvest/getplayerdata/:playerName?', (req, res) => {
    const playerName = req.params.playerName;

    // Verifica se o nome do jogador foi passado
    if (!playerName) {
      return res.status(400).json({ error: 'Nome do jogador não foi fornecido' });
    }

    const playerFile = `${playerName}.json`;
    const filePath = path.join(directoryPath, playerFile);

    // Verifica se o arquivo do jogador existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }

    // Lê o conteúdo do arquivo JSON do jogador
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao ler o arquivo do jogador' });
      }

      try {
        const playerData = JSON.parse(data);
        res.json(playerData);
      } catch (err) {
        console.error(`Erro ao analisar o JSON do jogador: ${playerName}`);
        res.status(500).json({ error: 'Erro ao analisar os dados do jogador' });
      }
    });
  });

  app.listen(19134)
}