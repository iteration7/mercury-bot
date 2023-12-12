import round from "./round.js"
export default async (mod, interaction, userData, minMax, reason) => {
  var credits;
  if (typeof minMax != "number") {
    var min = Math.ceil(minMax[0]);
    var max = Math.floor(minMax[1]);
    credits = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    credits = minMax;
  }

  if (userData.credits + credits < 0) {
    return false;
  } else userData.credits += credits;

  
  var user = interaction.author ? interaction.author : interaction.user;
  if (user.id != interaction.guild.ownerId) {
    try {
      var member = await interaction.guild.members.fetch(user.id);
      await member.setNickname(user.globalName + ` [ ${mod.emojis.credit}${round(userData.credits)} ]`);
    } catch (e) {
      console.log(e)
    }
  }
  

  return round(credits);
};
