import level from "./level.js";
import giveCredits from "./credits.js";
import log from "./log.js";
export default async (mod, interaction, userData, minMax, reason) => {
  if (interaction.author && interaction.author.bot) return;

  var min = Math.ceil(minMax[0]);
  var max = Math.floor(minMax[1]);
  const xp = Math.floor(Math.random() * (max - min + 1)) + min;

  userData.xp += xp;

  if (level(userData)) {
    userData.level++;
    userData.xp = 0;
    var credits = await giveCredits(
      mod,
      interaction,
      userData,
      [1, 20],
      "leveling up"
    );
    await log(
      mod,
      `
      ## <@${interaction.user.id}> has leveled up!
      ### LVL ${userData.level - 1} ≫ LVL ${userData.level}
      ### You have recieved ${mod.emojis.credit}${credits}.
    `
    );
  }

  return xp;
};
