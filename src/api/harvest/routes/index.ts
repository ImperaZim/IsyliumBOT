import { GLOBAL_URL } from '@api';
import { DynamicRoutes } from "@types";

export const routes: DynamicRoutes = {
  getPlayerData(playerName: string): string {
    return `${GLOBAL_URL}/harvest/getplayerdata/${playerName}`;
  },
  setLinkPlayer(playerName: string): string {
    return `${GLOBAL_URL}/harvest/linkplayer/${playerName}`;
  },
  addPlayerGift(playerName: string, giftType: string, giftValue: string): string {
    return `${GLOBAL_URL}/harvest/addgift/${playerName}/${giftType}/${giftValue}`;
  },
};
