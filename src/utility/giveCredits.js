export default async (mod, interaction, amount, reason, user) => {
  
  if(!user) {
    if(interaction.author) {
      user=interaction.author;
    }
    else {
      user=interaction.user;
    }
  }
  
  await mod.firestore.updateDoc(mod.firestore.doc(
    mod.db,
    "guilds",
    interaction.guild.id,
    "users",
    user.id
  ), {
    credits: mod.firestore.increment(amount)
  })

  const userData = (await mod.getUser(interaction.guild.id, user.id)).data()
  
  if(user.id!=interaction.guild.ownerId) {
    try {
      (await interaction.guild.members.cache.get(user.id)).setNickname(user.globalName+` [ ㅊ${userData.credits} ]`)
    }
    catch(e) {
      console.log(e)
    }
  }
};
