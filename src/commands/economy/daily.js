const User = require('../../models/user');

module.exports = {
  name: 'daily',
  description: 'Collect your daily reward.',
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      return interaction.reply({ content: 'You can only use this command inside a server.', ephemeral: true });
    }

    const DAILY_AMOUNT = 1000;

    try {
      await interaction.deferReply({ ephemeral: true });

      const query = { userId: interaction.member.id, guildId: interaction.guild.id };
      let user = await User.findOne(query);

      if (user) {
        const lastDailyDate = user.lastDaily.toDateString();
        const currentDate = new Date().toDateString();

        if (lastDailyDate === currentDate) {
          return interaction.editReply('You have already collected your daily reward today. Come back tomorrow.');
        }

        user.balance += DAILY_AMOUNT;
        user.lastDaily = new Date();
      } else {
        user = new User({
          ...query,
          balance: DAILY_AMOUNT,
          lastDaily: new Date(),
        });
      }

      await user.save();

      interaction.editReply(`$${DAILY_AMOUNT} was added to your balance. Your new balance is $${user.balance}.`);
    } catch (error) {
      console.error('Error with daily command:', error);
      interaction.editReply('An error occurred while processing your request. Please try again later.');
    }
  },
};
