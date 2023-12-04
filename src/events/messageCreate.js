import log from "../utility/log.js";
import giveXP from "../utility/giveXP.js";
import giveCredits from "../utility/giveCredits.js";
export default async (mod, message) => {
  if (!message.guild || message.author.bot) return;

  var userData = (
    await mod.getUser(message.guild.id, message.author.id)
  ).data();
  if (!userData)
    userData = {
      level: 1,
      xp: 0,
      credits: 0,
      messages: 0,
    };

  //if its a intro
  if (message.channel.name == "introductions") {
    message.react("1174052304090038404");
  }
  //for bumping server
  else if (
    message.author.id == "302050872383242240" &&
    message.embeds[0] &&
    message.embeds[0].title == "DISBOARD: The Public Server List"
  ) {
    var credits = await giveCredits(
      mod,
      userData,
      message,
      [0, 20],
      "bumping the server",
      message.interaction.user
    );
    await message.reply({
      content: `
      <@${message.interaction.user.id}> has recieved ㅊ${credits} for bumping the server.
      `,
    });
  }

  if (giveXP(mod, userData, message, [0, 20], "sending a message")) {
    var credits = await giveCredits(
      mod,
      userData,
      message,
      [0, 20],
      "leveling up"
    );
    await log(
      mod,
      `
      ## <@${message.author.id}> has leveled up!
      ### LVL ${userData.level - 1} ≫ LVL ${userData.level}
      ### You have recieved ㅊ${credits}.
    `
    );
  }

  const messageCountRoles = [
    {
      count: 100,
      id: "1176030533046784120",
    },
    {
      count: 500,
      id: "1176030643331813449",
    },
    {
      count: 1000,
      id: "1176030835770667038",
    },
    {
      count: 5000,
      id: "1181021696354951198",
    },
    {
      count: 10000,
      id: "1181021788566716448",
    },
    {
      count: 100000,
      id: "1181021861748940930",
    },
  ];
  userData.messages++;
  messageCountRoles.forEach((role) => {
    if (userData.messages >= role.count) {
      message.member.roles.add(role.id);
    }
  });

  await mod.setUser(message.guild.id, message.author.id, userData);
};
