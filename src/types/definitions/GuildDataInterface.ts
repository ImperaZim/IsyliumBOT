export interface DataBase {
  guildid: string;
}

export interface DeserializedData {
  ticket: DataBase | Record<string, never>;
}