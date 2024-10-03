import { Channel, User, Role } from 'discord.js';

export interface TranscriptOptions {
  limit?: number;
  returnType?: 'buffer' | 'string' | 'attachment';
  filename?: string;
  saveImages?: boolean;
  footerText?: string;
  poweredBy?: boolean;
  ssr?: boolean;
  callbacks?: {
    resolveChannel?: (channelId: string) => Promise<Channel | null>;
    resolveUser?: (userId: string) => Promise<User | null>;
    resolveRole?: (roleId: string) => Promise<Role | null>;
  };
}