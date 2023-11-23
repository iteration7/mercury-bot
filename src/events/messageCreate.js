
import giveXP from "../utility/giveXP.js";
import giveCredits from "../utility/giveCredits.js";
export default async (mod, message) => {
  if (!message.guild) return;
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
  
  if(message.author.id=="302050872383242240"&&message.embeds[0]&&message.embeds[0].title=="DISBOARD: The Public Server List") {
    message.interaction.guild=message.guild;
    await giveCredits(mod, message.interaction, 20, "bumping the server");
    await message.reply({
      content: `
      <@${message.interaction.user.id}> has recieved ㅊ20 for bumping the server.
      `
    })
  }
  giveXP(mod, message, [0, 10], "sending a message");
};
