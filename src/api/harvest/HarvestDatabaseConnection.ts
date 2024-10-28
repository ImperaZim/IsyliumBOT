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
    const playerData = data[0];
    return playerData ? (playerData.token ?? null) : null;
  }

  public static async getTokenByUser(token: string): Promise<any> {
    const data = await mysql.select(
      "harvest_players",
      "username",
      [{ token: token }]
    );
    const playerData = data[0];
    return playerData ? (playerData.username ?? null) : null;
  }

}