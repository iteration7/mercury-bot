export default async (mod, reaction) => {
  if (!reaction.message.author) await reaction.message.fetch();
  if (reaction.message.author.id == "1126699467928768514") {
    if (reaction.emoji.name == "📝") {
      const dm = await user.send({
        content:
          "hey! send a new version of the message here (you have ten minutes!) \n here is the orginal message:",
      });
      await user.send({
        content: reaction.message.content,
      });
      dm.channel
        .awaitMessages({
          max: 1,
          time: 600000,
          errors: ["time"],
        })
        .then(async (edit) => {
          edit = edit.first();
          await reaction.message.edit({
            content: edit.content,
          });
          dm.channel.send("message has been edited!");
        })
        .catch((collected) => {
          dm.channel.send("oof! you ran out of time. try again!");
        });
    }
    reaction.remove();
  }
};
