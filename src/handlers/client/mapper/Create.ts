import { Guild } from "discord.js";
import { mysql } from "@main"

export class GuildData {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }
  private async addGuild(): Promise<boolean> {
    const guildId = this.guild.id;

    try {
      await mysql.insert("discord_link", { guildid: guildId, created_at: new Date() });
      await mysql.insert("ticket_discord", { guildid: guildId, created_at: new Date() });
      return true;
    } catch (error) {
      console.error(`Erro ao adicionar guilda ${guildId}:`, error);
      return false;
    }
  }
}
  
