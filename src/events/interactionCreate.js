import shopItemsMod from "../utility/shopItems.js";
import giveCredits from "../utility/giveCredits.js";
export default async (mod, interaction) => {
  if (interaction.isChatInputCommand()) {
    for (var i in mod.commands) {
      if (interaction.commandName == mod.commands[i].name) {
        mod.commands[i].execute(mod, interaction);
      }
    }
  } else {
    if (interaction.customId == "shop") {
      try {
        const shop = interaction.message;
        const collectorFilter = (i) => true;

        var shopItems = [];
        for (var i in shopItemsMod) {
          shopItems[i] = new mod.discord.StringSelectMenuOptionBuilder()
            .setLabel(shopItemsMod[i].name)
            .setDescription("ㅊ" + shopItemsMod[i].cost)
            .setValue(shopItemsMod[i].name);
        }

        const select = new mod.discord.StringSelectMenuBuilder()
          .setCustomId("select")
          .setPlaceholder("Select a item to purchase.")
          .addOptions(...shopItems);

        const row2 = new mod.discord.ActionRowBuilder().addComponents(select);

        const userData = (
          await mod.getUser(interaction.guild.id, interaction.user.id)
        ).data();
        const response = await interaction.reply({
          content: `
          You have ㅊ${userData.credits}
          `,
          components: [row2],
          ephemeral: true,
          fetchReply: true,
        });

        const selectedItem = await response.awaitMessageComponent({
          filter: collectorFilter,
        });
        //items

        for (var i in shopItems) {
          if (shopItems[i].data.label == selectedItem.values[0]) {
            if (userData.credits >= Number(shopItemsMod[i].cost)) {
              shopItemsMod[i].buy(mod, selectedItem);
              await selectedItem.reply({
                content: "Item purchased succesfully.",
                ephemeral: true,
              });

              await giveCredits(
                mod,
                interaction,
                -shopItemsMod[i].cost,
                "Purchased " + shopItemsMod[i].name
              );
            } else {
              await selectedItem.reply({
                content: "Not enouph credits.",
                ephemeral: true,
              });
            }

            await interaction.editReply({
              content: "Please reopen the shop to purchase something again.",
              components: [],
            });

            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
