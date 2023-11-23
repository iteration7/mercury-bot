export default [
  {
    name: "Admin Perms",
    cost: "100000000000000",
    buy: (mod, interaction) => {
      
    }
  },
  {
    name: "Custom Role",
    cost: "100",
    buy: (mod, interaction) => {
      interaction.reply({
        content: "Please wait for staff assistance.",
        ephemeral: true
      })

      const channel = mod.client.channels.cache.get("1144206550370631720");

      channel.send({
        content: `<@${interaction.user.id}> just bought a custom role.`
      })
    }
  },
  {
    name: "Vodka",
    cost: 10,
    buy: (mod, interaction) => {
      const channel = mod.client.channels.cache.get("1144206550370631720");

      channel.send({
        content: `
        <@${interaction.user.id}> just bought 1 vodka.`
      })
    }
  }
]