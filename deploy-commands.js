require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandCategories = fs.readdirSync(commandsPath);

for (const category of commandCategories) {
  const categoryPath = path.join(commandsPath, category);
  const commandFiles = fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(categoryPath, file));
    if ('name' in command && 'description' in command) {
      // Construct the command data
      const commandData = {
        name: command.name,
        description: command.description,
        options: command.options || [],
        default_permission: command.default_permission || true,
        // Add 'dm_permission' if needed
        dm_permission: command.dm_permission || true,
        // Include 'default_member_permissions' if specified
        default_member_permissions: command.default_member_permissions
          ? command.default_member_permissions.toString()
          : null,
      };

      commands.push(commandData);
    } else {
      console.warn(`The command at ${file} is missing a "name" or "description" property.`);
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`Started refreshing application commands for guild ID ${process.env.GUILD_ID}.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application commands for guild.`);
  } catch (error) {
    console.error(error);
  }
})();
