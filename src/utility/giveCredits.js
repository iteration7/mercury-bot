export default async (mod, interaction, amount, reason) => {
  if (interaction.author && interaction.author.bot) return;
  
  const interactionData = {
    username: interaction.author
      ? interaction.author.username
      : interaction.user.username,
    userId: interaction.author ? interaction.author.id : interaction.user.id,
    guildId: interaction.guild.id,
  };
  
  await mod.firestore.updateDoc(mod.firestore.doc(
    mod.db,
    "guilds",
    interactionData.guildId,
    "users",
    interactionData.userId
  ), {
    credits: mod.firestore.increment(amount)
  })

  
};
