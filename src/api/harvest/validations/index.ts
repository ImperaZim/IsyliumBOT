import { mysql } from '@main';

export async function insertPlayerRecord(username: string, player: string): Promise<void> {
  await mysql.insert('harvest_players', {
    username: username,
    player: player,
  });
}

export async function getPlayerNickname(username: string): Promise<string | null> {
  const result = await mysql.select('harvest_players', 'nickname', {
    username: username,
  });
  if (result && result.length > 0) {
    return result[0].player;
  } else {
    return null;
  }
}
