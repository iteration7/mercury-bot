import { request } from 'undici';
import { registerFont, createCanvas, loadImage} from 'canvas';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  name: "stats",
  description: "get your current stats and level",
  options: [
    {
      name: "user",
      description: "Get rank card of user",
      type: 6,
    },
  ],
  execute: async function (mod, interaction) {
    
    var user = interaction.options.get("user")
      ? await mod.client.users.fetch(interaction.options.get("user").value)
      : interaction.user;
    
    if(user.bot) {
      return interaction.reply({
        content: "You cant get stats of a bot.",
        ephemeral: true
      })
    }
    
    var userData = (await mod.getUser(interaction.guild.id, user.id)).data();
    var sorted = [{ level: 0, xp: 0 }];
    var rank = 0;
    const querySnapshot = await mod.firestore.getDocs(
      mod.firestore.collection(mod.db, "guilds", interaction.guild.id, "users")
    );
    querySnapshot.forEach((doc, i) => {
      doc = doc.data();
      for (var j in sorted) {
        if (doc.level > sorted[j].level) {
          sorted.splice(j, 0, doc);
          break;
        } else if (doc.level == sorted[j].level) {
          if (doc.xp >= sorted[j].xp) {
            sorted.splice(j, 0, doc);
            break;
          }
        }
      }
    });
    for (var i in sorted) {
      if (userData.level == sorted[i].level && userData.xp == sorted[i].xp)
        rank = (Number(i)+1);
    }

    
    registerFont(__dirname +"/../assets/font.ttf", { family: "mercury" })

    const canvas = createCanvas(700, 250);
		const context = canvas.getContext('2d');

    const applyText = (fontSize, text, ...pos) => {
	    const context2 = canvas.getContext('2d');

	    do {
		    // Assign the font to the context and decrement it so it can be measured again
		    context2.font = `${fontSize -= 10}px mercury`;
		    // Compare pixel width of the text to the canvas minus the approximate avatar size
	    } while (context2.measureText(text).width > canvas.width - 300);

	    // Return the result to use in the actual canvas
	    context.font=context2.font;
      context.fillStyle = '#ffffff';
      context.fillText(text, ...pos);
    };

    applyText(60, `${user.displayName}`, canvas.width / 3.5, canvas.height / 3.6);

    var percent = (userData.xp/((userData.level+1)*100))*100;
    var width = (percent/100)*475
    context.beginPath()
    context.strokeStyle="#7e3dff"
    context.roundRect(canvas.width / 3.5, canvas.height / 2.5, 475, 85, 25)
    context.stroke()

    context.beginPath()
    context.fillStyle="#7e3dff"
    context.roundRect(canvas.width / 3.5, canvas.height / 2.5, width, 85, 25)
    context.fill()

    applyText(55, `#${Number(rank)}`, canvas.width / 1.2, canvas.height / 3.6);
    applyText(55, "LVL "+userData.level, canvas.width / 3.2, canvas.height / 1.6);
    applyText(55, userData.xp+"/"+(userData.level+1)*100, canvas.width / 1.5, canvas.height / 1.6);
    
    applyText(55, `Msgs: ${userData.messages}`, canvas.width / 2, canvas.height / 1.05)
    applyText(55, `${userData.credits}`, 80, canvas.height / 1.05)
    
    const icon = await loadImage(__dirname+'/../assets/credits.png');
	  context.drawImage(icon, 20, canvas.height / 1.25, 50, 50);
    
    context.beginPath();
    context.arc(100, 100, 75, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    
    const avatar = await loadImage("https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+".jpeg");
    context.drawImage(avatar, 25, 25, 150, 150);
    
    const attachment = new mod.discord.AttachmentBuilder(canvas.pngStream(), { name: 'stats.png' });
    interaction.reply({
      files: [attachment],
    });
  },
};
