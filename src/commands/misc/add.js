const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'add',
  description: 'Adds two numbers together',
  options: [
    {
      name: 'num1',
      description: 'The first number',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: 'num2',
      description: 'The second number',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  callback: (client, interaction) => {
    const num1 = interaction.options.getNumber('num1');
    const num2 = interaction.options.getNumber('num2');
    interaction.reply(`The sum is ${num1 + num2}`);
  },
};
