import giveCredits from "../../utility/credits.js";
import giveXP from "../../utility/xp.js"
export default {
  name: "daily",
  description: "Get your daily reward",
  execute: async (mod, interaction) => {
    const userData = (await mod.getUser(interaction.user.id)).data();

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    
    var currentDate = day+"/"+month+"/"+year
    
    var prevDate = userData.daily;
    
    if(!prevDate||new Date(currentDate)>new Date(prevDate)) {
      var credits = await giveCredits(mod, interaction, userData, [0,100]);
      var xp = await giveXP(mod, interaction, userData, [0,100])
      userData.daily=currentDate;
      await mod.setUser(interaction.user.id, userData)

      interaction.reply({
        content: `
        You have recieved *${mod.emojis.credit}${credits}* and *${xp}XP*. Come back tomorrow for more rewards!
        `
      })
    }
    else {
      interaction.reply({
        content: "You have already recieved your daily reward, try again tomorrow.",
        ephemeral: true
      })
    }
  }
}