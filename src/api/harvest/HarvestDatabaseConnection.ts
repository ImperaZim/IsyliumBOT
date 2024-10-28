import { mysql } from "@main";

export class HarvestDatabaseConnection {

  public static async setPlayerData(username: string, token: string): Promise<void> {
    await mysql.insert("harvest_players", {
      username: username,
      token: token
    });
  }

  public static async getUserByToken(username: string): Promise<any> {
    const data = await mysql.select(
      "harvest_players",
      "token",
      [{ username: username }]
    );
    if (data && data.length >= 1) {
      const playerData = data[0];
      return playerData.token ?? null;
    }
    return null;
  }

  public static async getTokenByUser(token: string): Promise<any> {
    const data = await mysql.select(
      "harvest_players",
      "username",
      [{ token: token }]
    );
    if (data && data.length >= 1) {
      const playerData = data[0];
      return playerData.username ?? null;
    }
    return null;
  }

}