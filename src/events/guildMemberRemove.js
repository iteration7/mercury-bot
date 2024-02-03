export default async (mod, member) => {
  const leaveChannel = await member.guild.channels.fetch("1181069125976608768");
  var embed = new mod.discord.EmbedBuilder()
    .setTitle(`${member.user.globalName} (${member.user.username}) just left the server.`)
    .setDescription(
      `Goodbye.`
    )
    .setTimestamp()
    .setColor("#ff0000");

  leaveChannel.send({
    content: `<@${member.id}>`,
    embeds: [embed],
  });
};
