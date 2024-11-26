const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    // Developer-only commands
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Only developers can run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    // Test server-only commands
    if (commandObject.testOnly) {
      if (interaction.guild.id !== testServer) {
        interaction.reply({
          content: 'This command cannot be run in this server.',
          ephemeral: true,
        });
        return;
      }
    }

    // User permissions
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "You don't have the required permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    // Bot permissions
    if (commandObject.botPermissions?.length) {
      const bot = interaction.guild.members.me;
      for (const permission of commandObject.botPermissions) {
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have the required permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    interaction.reply({
      content: 'There was an error executing this command.',
      ephemeral: true,
    });
  }
};
