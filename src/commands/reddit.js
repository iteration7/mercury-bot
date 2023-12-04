import { got } from "got";
export default {
  name: "reddit",
  description: "Get a post from reddit",
  options: [
    {
      name: "subreddit",
      description: "Subreddit to get a post from",
      type: 3,
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
        content: "Couldn't get subreddit: " + e,
        ephemeral: true,
      });
    }
    if (!response) return;

    const parentData = JSON.parse(response.body)[0];
    if (!parentData) {
      return interaction.reply({
        content: "Couldn't get post.",
        ephemeral: true,
      });
    }

    const data = parentData.data.children[0].data;

    var content = "";
    const permalink = data.permalink;
    var selftext = data.selftext ? data.selftext : "";
    const postUrl = `https://reddit.com${permalink}`;
    const postImg = data.url;
    const postTitle = data.title;
    const postUpvotes = data.ups;
    const postDownvotes = data.downs;
    const postComments = data.num_comments;
    const postAuthor = data.author;

    //if nsfw

    if (data.over_18) {
      return interaction.reply({
        content: "Could not get post because post content is NSFW.",
        ephemeral: true,
      });
    }

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
    const files = [];
    const text = [];
    for (var i = 0; i < selftext.length; i += 2000) {
      var newText = selftext.slice(i, 2000 + i);
      newText = newText.replaceAll("amp;", "");
      text.push(newText);
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
      if (data.media[i].fallback_url) files.push(data.media[i].fallback_url);
    }
    for (var i in data.preview) {
      if (i != "reddit_video_preview") continue;
      if (data.preview[i].fallback_url) {
        files.push(data.preview[i].fallback_url);
      }
    }

    await interaction.reply({
      content: "Successfuly fetched post.",
      ephemeral: true,
    });
    await interaction.channel.send({
      content: content,
      embeds: embeds,
      files: files,
    });
  },
};
