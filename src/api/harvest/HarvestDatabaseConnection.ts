import { mysql } from "@main";

export class HarvestDatabaseConnection {

  public static async setPlayerData(username: string, token: string): Promise<void> {
    await mysql.insert("harvest_players", {
      username: username,
      token: token
    });
  }

  public static async getUserToken(username: string): Promise<any> {
    return await mysql.select(
      "harvest_players",
      "token",
      [{ username: username }]
    );
  }

}