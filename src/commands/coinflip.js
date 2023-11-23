export default {
  name: "coinflip",
  description: "toss a coin! (heads or tails?)",
  execute: function (i, interaction) {
    const num = Math.floor(Math.random() * 2);
    let resultFlip = "";
    if (num === 0) {
      resultFlip = "tails!";
    } else {
      resultFlip = "heads!";
    }
    interaction.reply({
      content: resultFlip,
    });
  },
};
