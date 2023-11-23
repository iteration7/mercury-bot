export default async (mod, member) => {
  const channel = mod.client.channels.cache.get("1144206550370631720");

  channel.send(`
  <@${member.user.id}> Welcome!
  Please introduce yourself in <#1143601895294910636> :D
  `);
};