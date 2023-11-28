import log from "./log.js";
import level from "./level.js";

export default async (i, interaction, minMax, reason) => {
  if (interaction.author && interaction.author.bot) return;
  
  var min = Math.ceil(minMax[0]);
  var max = Math.floor(minMax[1]);
  const xp = Math.floor(Math.random() * (max - min + 1)) + min;

  const interactionData = {
    username: interaction.author
      ? interaction.author.username
      : interaction.user.username,
    userId: interaction.author ? interaction.author.id : interaction.user.id,
    guildId: interaction.guild.id,
  };
  
  const doc = i.firestore.doc(
    i.db,
    "guilds",
    interactionData.guildId,
    "users",
    interactionData.userId
  );
  var user = await i.getUser(interactionData.guildId, interactionData.userId);
  var userData;

  //if user doesnt exist
  if (!user.exists()) {
    userData = {
      xp: xp,
      credits: 0,
      messages: 0,
      level: 1,
    };
    await i.firestore.setDoc(doc, userData);
  }
  else userData = user.data();
  
  if (reason == "sending a message") userData.messages++;
  userData.xp += xp;

  //log(i, `${interactionData.username} recieved ${xp}xp for ` + reason)

  if (level(userData)) {
    userData.level++;
    userData.xp = 0;
    userData.credits += 10;
    var message = `
        ## <@${interactionData.userId}> has leveled up!
        LVL ${userData.level - 1} ≫ LVL ${userData.level}
        ㅊ10 has been recieved
        `;
    log(i, message);
    
    if(interaction.author.id!=interaction.guild.ownerId) {
      try {
        interaction.member.setNickname(interaction.author.globalName+` [ ㅊ${userData.credits} ]`)
      }
      catch(e) {
        console.log(e)
      }
    }
  }

  await i.firestore.updateDoc(doc, userData);

  return userData;
};
