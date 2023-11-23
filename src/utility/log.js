export default function log(mod, message) {
  const channel = mod.client.channels.cache.get("1140200693425262592");

  const embedMessage = new mod.discord.EmbedBuilder()
    .setTitle(`${message}`)
    .setColor(0x7e3dff);

  channel.send({
    content: message,
    //embeds: [embedMessage]
  });
}
