export default async (mod, interaction, amount, reason) => {
  if (interaction.author && interaction.author.bot) return;
  
  const interactionData = {
    globalName: interaction.author
      ? interaction.author.globalName
      : interaction.user.globalName,
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

  var user = await mod.getUser(interactionData.guildId, interactionData.userId);
  const userData = user.data()

  if(interactionData.userId!=interaction.guild.ownerId) {
    try {
      interaction.member.setNickname(interactionData.globalName+` [ ㅊ${userData.credits} ]`)
    }
    catch(e) {
      console.log(e)
    }
  }
};
