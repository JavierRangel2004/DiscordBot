require("dotenv").config();
const { ButtonBuilder } = require("@discordjs/builders");
const { ActionRowBuilder } = require("@discordjs/builders");
const { Client, IntentsBitField, ActionRow, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1309594087682347088",
    label: "Morado",
  },
  {
    id: "1309593779707056198",
    label: "Verde",
  },
  {
    id: "1309593984946929725",
    label: "Azul",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1309577749911965737");
    if (!channel) return console.error("Channel not found");

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Secondary)
        );
    });

    await channel.send({ content: "Selecciona un color", components: [row] });
    process.exit();
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
