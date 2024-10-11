import { Interaction } from 'discord.js';

interface DynamicRoutes {
  [routeName: string]: (playerName: string) => string;
}

export interface PlayerDataResponse {
  metadata?: string;
}

export interface DecodedMetadata {
  [key: string]: any;
}

export type MessageCallback = (interaction: Interaction, message: string) => Promise<void>;