import welcomeMessage from "../utility/welcomeMessage.js";
export default async function (mod, member) {
  const joinChannel = await member.guild.channels.fetch("1181069026991026178");
  var embed = new mod.discord.EmbedBuilder()
    .setTitle("Welcome!")
    .setDescription(`
      <@${member.id}> just joined the server.
    `,)
    .setTimestamp()
    .setColor("#7e3dff")
  
  joinChannel.send({
    embeds: [embed],
  })
  
  welcomeMessage(mod, member);
}
