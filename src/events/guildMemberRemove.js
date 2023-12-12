export default async (mod, member) => {
  const leaveChannel = await member.guild.channels.fetch("1181069125976608768");
  var embed = new mod.discord.EmbedBuilder()
    .setTitle("Goodbye.")
    .setDescription(`
      <@${member.id}> just left the server.
    `,)
    .setTimestamp()
    .setColor("#ff0000")

  leaveChannel.send({
    embeds: [embed],
  })
}