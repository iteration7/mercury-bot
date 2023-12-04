import welcomeMessage from "../utility/welcomeMessage.js";
export default async function (mod, member) {
  const joinChannel = await member.guild.channels.fetch("1181069026991026178");
  joinChannel.send({
    content: `
    <@${member.id}> just joined the server.
    `,
    is_silent: true
  })
  
  welcomeMessage(mod, member);
}
