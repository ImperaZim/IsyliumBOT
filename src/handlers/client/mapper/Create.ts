import { Guild } from "discord.js";
import { mysql } from "@main";

export class CreatedGuild {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

public async checkAndAddGuild(): Promise<boolean> {
    const guildId = this.guild.id;

    try {
      const DiscordLink = await mysql.select(
        "discord_link",
        "guildid",
        [{ guildid: guildId }]
      );

      const TicketDiscord = await mysql.select(
        "ticket_discord",
        "guildid",
        [{ guildid: guildId }]
      );

      if (!DiscordLink && !TicketDiscord) {
        return await this.addGuild();
      }

      console.log(`A guilda ${guildId} já existe nas tabelas.`);
      return false;
    } catch (error) {
      console.error(`Erro ao verificar ou adicionar guilda ${guildId}:`, error);
      return false;
    }
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
