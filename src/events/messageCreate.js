
import giveXP from "../utility/giveXP.js";
import giveCredits from "../utility/giveCredits.js";
export default async (mod, message) => {
  if (!message.guild) return;

  //if its a intro
  if(message.channel.name=="introductions") {
    message.react("1174052304090038404")
  }
  
  try {
    var doc = mod.firestore.doc(mod.db, "guilds/" + message.guild.id);

    var guild = await mod.firestore.getDoc(doc);

    //if guild in not already database
    if (!guild.exists()) {
      await mod.firestore.setDoc(doc, {
        verified: true,
      });
    }
  } catch (e) {
    console.log("error:" + e);
  }

  //for bumping server
  if(message.interaction||message.author.id=="302050872383242240"&&message.embeds[0]&&message.embeds[0].title=="DISBOARD: The Public Server List") {
    await giveCredits(mod, message, 20, "bumping the server", message.interaction.user);
    await message.reply({
      content: `
      <@${message.interaction.user.id}> has recieved ㅊ20 for bumping the server.
      `
    })
  }

  if(!message.author.bot) {
    const userData = await giveXP(mod, message, [0, 10], "sending a message");
  }
};
