import { mysql } from '@main';

export async function insertPlayerRecord(userId: string, player: string): Promise<void> {
  await mysql.insert('harvest_players', {
    id: userId,
    player: player,
  });
}

export async function getPlayerNickname(nickname: string): Promise<string | null> {
  const result = await mysql.select('harvest_players', 'player', {
    player: nickname,
  });
  if (result && result.length > 0) {
    return result[0].player;
  } else {
    return null;
  }
}
