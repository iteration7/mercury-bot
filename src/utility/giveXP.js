import level from "./level.js";

export default (i, userData, interaction, minMax, reason) => {
  if (interaction.author && interaction.author.bot) return;

  var min = Math.ceil(minMax[0]);
  var max = Math.floor(minMax[1]);
  const xp = Math.floor(Math.random() * (max - min + 1)) + min;

  userData.xp += xp;

  if (level(userData)) {
    userData.level++;
    userData.xp = 0;
    return true;
  }
};
