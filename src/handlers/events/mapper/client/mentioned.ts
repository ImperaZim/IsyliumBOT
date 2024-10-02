import { ExtendedEvent } from "@@extensions";

export default new ExtendedEvent({
  name: "messageCreate",
  run(client, message) {
    const author = message.author;

    if (!author.bot) {
      if (client.user) {
        if (message.content.includes(`<@${client.user.id}>`)) {
          const mentionText = `<@${client.user.id}>`;
          if (message.content.trim() === mentionText) {
            message.channel.send(
              `Olá <@${author.id}>! Para ver meus comandos, digite </help:1152237815170601040>.`
            );
          }
        }
      }
    }
  },
});
