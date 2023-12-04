import shopItems from "../utility/shopItems.js";
export default {
  name: "shop",
  description: "Creates the shop",
  execute: async (mod, interaction) => {
    const shopButton = new mod.discord.ButtonBuilder()
      .setCustomId("shop")
      .setLabel("🛒 Shop")
      .setStyle("Primary");

    const row = new mod.discord.ActionRowBuilder().addComponents(shopButton);

    const shop = await interaction.reply({
      content: `
      
      `,
      components: [row],
    });
  },
};
