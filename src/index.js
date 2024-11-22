require("dotenv").config();

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", async (c) => {
  console.log(`${c.user.tag} has logged in.`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "ping") {
    message.reply("pong");
  }

  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("This is an embed!")
      .setDescription("This is a description!")
      .setColor("Random")
      .addFields([
        {
          name: "Field 1",
          value: "Value 1",
          inline: true,
        },
        {
          name: "Field 2",
          value: "Value 2",
          inline: true,
        },
      ]);

    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isButton()) {
      await interaction.deferReply({ ephemeral: true });



      const role = interaction.guild.roles.cache.get(interaction.customId);

      if (!role) {
        await interaction.editReply({ content: "Role not found" });
        return;
      }

      const hasRole = interaction.member.roles.cache.has(role.id);

      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply({ content: `Removed ${role.name} role.` });
      } else {
        await interaction.member.roles.add(role);
        await interaction.editReply({ content: `Added ${role.name} role.` });
      }

      return;
    }


    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "hey") {
        await interaction.reply("Hello!");
      }

      if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
      }

      if (interaction.commandName === "add") {
        const num1 = interaction.options.getNumber("num1");
        const num2 = interaction.options.getNumber("num2");

        await interaction.reply(`The sum is ${num1 + num2}`);
      }

      if (interaction.commandName === "embed") {
        const embed = new EmbedBuilder()
          .setTitle("This is an embed!")
          .setDescription("This is a description!")
          .setColor("Random")
          .addFields([
            { name: "Field 1", value: "Value 1", inline: true },
            { name: "Field 2", value: "Value 2", inline: true },
          ]);

        await interaction.reply({ embeds: [embed] });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
