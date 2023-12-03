import log from "../utility/log.js";
import giveXP from "../utility/giveXP.js";
import giveCredits from "../utility/giveCredits.js";
export default async (mod, message) => {
  if (!message.guild||message.author.bot) return;

  var userData = (await mod.getUser(message.guild.id, message.author.id)).data()
  if(!userData) userData = {
    level: 1,
    xp: 0,
    credits: 0,
    messages: 0
  }
  console.log(userData)
  
  //if its a intro
  if(message.channel.name=="introductions") {
    message.react("1174052304090038404")
  }
  //for bumping server
  else if(message.author.id=="302050872383242240"&&message.embeds[0]&&message.embeds[0].title=="DISBOARD: The Public Server List") {
    var credits = await giveCredits(mod, message, [0, 20], "bumping the server", message.interaction.user);
    await message.reply({
      content: `
      <@${message.interaction.user.id}> has recieved ㅊ${credits} for bumping the server.
      `
    })
  }
  
    if(giveXP(mod, userData, message, [0, 20], "sending a message")) {
      var credits = await giveCredits(mod, userData, message, [0, 20], "leveling up")
      await log(mod, `
        ## <@${message.author.id}> has leveled up!
        ### LVL ${userData.level - 1} ≫ LVL ${userData.level}
        ### You have recieved ㅊ${credits}.
        `);
    }

    userData.messages++;
  
    await mod.setUser(message.guild.id, message.author.id, userData)
};
