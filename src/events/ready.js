export default async (mod) => {
  //register commands
  console.log("Registering commands...");
  const rest = new mod.discord.REST({ version: "10" }).setToken(
    process.env.TOKEN
  );
  const guilds = mod.client.guilds.cache.map((guild) => guild.id);
  for (var i in guilds) {
    try {
      await rest.put(
        mod.discord.Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          guilds[i]
        ),
        { body: mod.commands }
      );
    } catch (e) {
      console.log(
        "Error registering commands in server " + guilds[i] + ": " + e
      );
    }
  }
  console.log("Commands registered.");
  console.log("Mercury's running!");
  
};
