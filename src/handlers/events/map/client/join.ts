import { ExtendedEvent } from "@extensions";

export default new ExtendedEvent({
  name: "guildCreate",
  async run(client, guild) {
    await client.registerall();
  },
});
