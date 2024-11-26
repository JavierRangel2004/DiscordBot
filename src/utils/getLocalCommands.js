const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = function getLocalCommands(exceptions = []) {
  const localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const category of commandCategories) {
    const commandFiles = getAllFiles(category);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);
      if (exceptions.includes(commandObject.name)) {
        continue;
      }
      localCommands.push(commandObject);
    }
  }
  return localCommands;
};
