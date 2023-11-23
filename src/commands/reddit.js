import { got } from "got";
import { ApplicationCommandOptionType } from "discord.js";
export default {
  name: "reddit",
  description: "get a post from reddit",
  options: [
    {
      name: "subreddit",
      description: "subreddit to get a post from",
      type: ApplicationCommandOptionType.String, // so i'm like having trouble with this sm :sob: plz help ty
      required: true,
    },
  ],
  execute: async function (mod, interaction) {
    const subreddit = interaction.options.get("subreddit").value;
    var response;

    try {
      response = await got(
        `https://www.reddit.com/r/${subreddit}/random/.json`
      );
    } catch (e) {
      response = null;
      await interaction.reply({
        content: "Couldn't getting subreddit: " + e,
        ephemeral: true,
      });
    }
    if (!response) return;

    const parentData = JSON.parse(response.body)[0];
    if (!parentData) {
      interaction.reply({
        content: "Couldn't get post.",
        ephemeral: true,
      });
      return;
    }
    const data = parentData.data.children[0].data;

    const permalink = data.permalink;
    var selftext = data.selftext ? data.selftext : "";
    const postUrl = `https://reddit.com${permalink}`;
    const postImg = data.url;
    const postTitle = data.title;
    const postUpvotes = data.ups;
    const postDownvotes = data.downs;
    const postComments = data.num_comments;
    const postAuthor = data.author;
    const embedPost = new mod.discord.EmbedBuilder()
      .setTitle(
        `
      ${postTitle}
      `
      )
      .setDescription(
        `
      🔼 ${postUpvotes} 🔽 ${postDownvotes} 💬 ${postComments}
      `
      )
      .setAuthor({
        name: `${postAuthor} from ${data.subreddit_name_prefixed} `,
        iconURL:
          "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/640px-Reddit_Logo_Icon.svg.png",
        url: `https://reddit.com/u/${postAuthor}`,
      })
      .setColor("FF4500")
      .setURL(postUrl);

    const embeds = [embedPost];
    const text = [];
    for (var i = 0; i < selftext.length; i += 2000) {
      text.push(selftext.slice(i, 2000 + i));
    }
    for (var i in text) {
      embeds.push(
        new mod.discord.EmbedBuilder()
          .setTitle("\n")
          .setColor("FF4500")
          .setDescription(text[i])
      );
    }

    if (data.post_hint == "image") {
      embeds.push(
        new mod.discord.EmbedBuilder().setColor("FF4500").setImage(postImg)
      );
    }
    if (data.gallery_data) {
      for (var i in data.gallery_data.items) {
        embeds.push(
          new mod.discord.EmbedBuilder()
            .setColor("FF4500")
            .setImage(
              "https://i.redd.it/" +
                data.gallery_data.items[i].media_id +
                ".jpg"
            )
        );
      }
    }

    for (var i in data.media) {
      if (typeof data.media[i] != "object") break;
      if (data.media[i].fallback_url)
        interaction.channel.send({
          content: "[⠀](" + data.media[i].fallback_url + ")",
        });
    }
    for (var i in data.preview) {
      if (i != "reddit_video_preview") continue;
      if (data.preview[i].fallback_url)
        interaction.channel.send({
          content: "[⠀](" + data.preview[i].fallback_url + ")",
        });
    }

    await interaction.reply({
      embeds: [...embeds],
    });
  },
};
