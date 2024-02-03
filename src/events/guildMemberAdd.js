import welcomeMessage from "../utility/welcomeMessage.js";
export default async function (mod, member) {
  const joinChannel = await member.guild.channels.fetch("1181069026991026178");
  
  var embed = new mod.discord.EmbedBuilder()
    .setTitle(`${member.user.globalName} (${member.user.username}) just joined the server.`)
    .setDescription(
      `Welcome!`
    )
    .setTimestamp()
    .setColor("#7e3dff");

  joinChannel.send({
    content: `<@${member.id}>`,
    embeds: [embed],
  });
  
  welcomeMessage(mod, member);
}
