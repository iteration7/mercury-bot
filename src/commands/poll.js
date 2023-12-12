export default {
  name: "poll",
  description: "Create a poll",
  options: [
    {
      name: "title",
      description: "title of the poll",
      type: 3,
      required: true
    },
    {
      name: "option-1",
      description: "option 1",
      type: 3,
      required: true
    },
    {
      name: "option-2",
      description: "option 2",
      type: 3,
      required: true
    },
    {
      name: "option-3",
      description: "option 3",
      type: 3,
      required: false
    },
    {
      name: "option-4",
      description: "option 4",
      type: 3,
      required: false
    }
  ],
  execute: (mod, interaction) => {
    interaction.reply({
      content: "coming soon...",
      ephemeral: true
    })
  }
}