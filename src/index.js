import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import * as discord from "discord.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
const firestore = {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
};

import dotenv from "dotenv";
dotenv.config();

import emojis from "./utility/emojis.js";

//const intents = discord.IntentsBitField.Flags;
const client = new discord.Client({
  intents: [
    discord.IntentsBitField.Flags.Guilds,
    discord.IntentsBitField.Flags.GuildMembers,
    discord.IntentsBitField.Flags.GuildMessages,
    discord.IntentsBitField.Flags.MessageContent,
    discord.IntentsBitField.Flags.GuildMessageReactions,
    discord.GatewayIntentBits.DirectMessages,
    discord.GatewayIntentBits.MessageContent,
  ],
  partials: [
    discord.Partials.Message,
    discord.Partials.Channel,
    discord.Partials.Reaction,
  ],
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mercurysevenbot.firebaseapp.com",
  projectId: "mercurysevenbot",
  storageBucket: "mercurysevenbot.appspot.com",
  messagingSenderId: "888876390140",
  appId: "1:888876390140:web:07da6784a7dd94254de979",
  measurementId: "G-DNGBNEMR7Y",
};

await (async () => {
  const app = await initializeApp(firebaseConfig);
  const db = await firestore.getFirestore(app);

  
  const commands = [];
  const mod = {
    discord,
    client,
    firestore,
    db,
    commands,
    emojis,
    getUser: async (userId) => {
      try {
        const doc = firestore.doc(db, "servers", '1080239936814448801', 'members', userId);
        const user = await firestore.getDoc(doc);
        if (!user.exists()) await firestore.setDoc(doc, {});
        return user;
      } catch (e) {
        console.log(e);
      }
    },
    setUser: async (userId, data) => {
      try {
        await firestore.updateDoc(firestore.doc(db, 'servers', '1080239936814448801', "members", userId), data);
      } catch (e) {
        console.log(e);
      }
    },
  };

  //commands
  const addCommands = async (path) => {
    const commandFiles = fs.readdirSync(path);
    for (const file of commandFiles) {
      if (!file.includes(".")) {
        await addCommands(path + "/" + file);
      } else if (file.endsWith(".js")) {
        const command = (await import(path + "/" + file)).default;
        if ("execute" in command) {
          var execute = command.execute;
          commands.push(command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "execute" property.`
          );
        }
      }
    }
  };
  await addCommands(path.join(__dirname, "/commands"));

  //events
  const eventFiles = fs.readdirSync(path.join(__dirname, "/events"));
  for (const file of eventFiles) {
    if (!file.endsWith(".js")) continue;
    const event = (await import("./events/" + file)).default;
    client.on(file.split(".")[0], (...args) => {
      event(mod, ...args);
    });
  }

  client.login(process.env.TOKEN);
})();
