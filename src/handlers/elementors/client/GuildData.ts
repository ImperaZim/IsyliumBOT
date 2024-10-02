import { Guild } from "discord.js";
import { mysql } from "Mysql";
import { OkPacket, RowDataPacket } from "mysql2/promise";

interface Data {
  guildid: string;
}
interface DeserializedData {
  ticket: Data | Record<string, never>;
}

export class GuildData {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  public async checkGuildData(): Promise<boolean> {
    const guildId = this.guild.id;
    const connection = await this.getConnection();

    try {
      const [rows] = await connection.execute(
        "SELECT COUNT(*) AS ticket_count FROM ticket WHERE guildid = ?",
        [guildId]
      ) as [RowDataPacket[]];

      const ticketCount = rows[0].ticket_count as number;
      return ticketCount > 0;
    } catch (error) {
      console.error(`Erro ao verificar os dados da guild ${guildId}:`, error);
      return false;
    } finally {
      connection.release();
    }
  }

  public async deserialize(): Promise<DeserializedData> {
    const guildId = this.guild.id;

    const ticketResult = await mysql.select("ticket", "*", [{ guildid: guildId }], "LIMIT 1");

    const data: DeserializedData = {
      ticket: ticketResult?.[0] ?? {}
    };

    return data;
  }

  public async createGuildData(): Promise<boolean> {
    const guildId = this.guild.id;
    const connection = await this.getConnection();

    try {
      await connection.execute(
        "INSERT INTO ticket (guildid) VALUES (?)",
        [guildId]
      );
      return true;
    } catch (error) {
      console.error(`Erro ao criar dados da guild ${guildId}:`, error);
      return false;
    } finally {
      connection.release();
    }
  }

  private async getConnection() {
    const login = mysql.login();
    return await login.getConnection();
  }
}
