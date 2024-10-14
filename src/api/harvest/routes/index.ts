import { GLOBAL_URL } from '@api';
import { DynamicRoutes } from "@types";

export const routes: DynamicRoutes = {
  getPlayerData(nickname: string): string {
    return `${GLOBAL_URL}/harvest/getplayerdata/${nickname}`;
  },
  setLinkPlayer(nickname: string): string {
    return `${GLOBAL_URL}/harvest/linkplayer/${nickname}`;
  },
  addPlayerGift(nickname: string, giftType: string, giftValue: string): string {
    return `${GLOBAL_URL}/harvest/addgift/${nickname}/${giftType}/${giftValue}`;
  },
};
