import giveCredits from "../utility/credits.js";
export default {
  name: "coinflip",
  description: "Toss a coin! (heads or tails?)",
  options: [
    {
      name: "credits",
      description: "Amount of credits to spend",
      type: 10,
      required: false,
    },
  ],
  execute: async function (mod, interaction) {
    const num = Math.floor(Math.random() * 2);
    let resultFlip = "";
    if (num === 0) {
      resultFlip = "Tails!";
    } else {
      resultFlip = "Heads!";
    }
    var embed = new mod.discord.EmbedBuilder().setTitle(resultFlip).setColor("#7e3dff")
    var credits = interaction.options.get("credits");
    if(credits) {
      credits=credits.value;
      var userData = await mod.getUser(interaction.user.id)
      userData=userData.data()

      if(await giveCredits(mod, interaction, userData, -credits)) {
        if(resultFlip=="Heads!") {
          await giveCredits(mod, interaction, userData, credits*2);
          await mod.setUser(interaction.user.id, userData)
          embed.setDescription(`You bet ${mod.emojis.credit}${credits} and won ${mod.emojis.credit}${credits*2}!!!`).setColor("#0cff00")
          interaction.reply({
            content: ``,
            embeds: [embed]
          })
        }
        else {
          embed.setDescription(`You bet ${mod.emojis.credit}${credits} and lost it all :c`).setColor("#ff0000")
          interaction.reply({
            content: "",
            embeds: [embed]
          })
        }
      }
      else {
        interaction.reply({
          content: "Not enouph credit."
        })
      }
    }
    else {
      interaction.reply({
        content: "",
        embeds: [embed]
      });
    }
  },
};
