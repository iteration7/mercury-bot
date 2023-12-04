export default async (mod, member) => {
  const leaveChannel = await member.guild.channels.fetch("1181069125976608768");
  leaveChannel.send({
    content: `
    <@${member.id}> just left the server :(
    `,
  })
}