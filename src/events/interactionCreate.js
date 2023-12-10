import shopItemsMod from "../utility/shopItems.js";
import giveCredits from "../utility/credits.js";
export default async (mod, interaction) => {
  
  if (interaction.isChatInputCommand()) {
    for (var i in mod.commands) {
      if (interaction.commandName == mod.commands[i].name) {
        mod.commands[i].execute(mod, interaction);
      }
    }
  } else {
    
  }
  
};
