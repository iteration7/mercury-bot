import { ApplicationCommandOptionType } from "discord.js";

export default {
  name: "say",
  description: "sends an editable message as Mercury!",
  options: [
    {
      name: "message",
      description: "what to say",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  execute: async function (i, interaction) {
    const messageContent = interaction.options.get("message").value;
    const channel = i.client.channels.cache.get(interaction.channelId);

    if (interaction.member.roles.cache.some((role) => role.name === "Admin")) {
      await channel.send(messageContent);

      await interaction.reply({
        content: "sent! react to the message with :pencil: to edit it.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "You do not have permission to execute this command.",
        ephemeral: true,
      });
    }
  },
};
