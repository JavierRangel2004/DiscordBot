const { ApplicationCommandOptionType, AttachmentBuilder, IntentsBitField } = require('discord.js');
const canvacord = require('canvacord');
const Level = require('../../models/level');
const calculateLevelXP = require('../../utils/calculateLevelXP');

module.exports = {
  name: 'level',
  description: 'Displays your or someone else\'s level.',
  options: [
    {
      name: 'target_user',
      description: 'The user whose level you want to see',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      return interaction.reply('You can only use this command inside a server.');
    }

    await interaction.deferReply();

    const targetUser = interaction.options.getUser('target_user') || interaction.user;

    const targetMember = await interaction.guild.members.fetch(targetUser.id);

    const fetchedLevel = await Level.findOne({
      userId: targetUser.id,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      return interaction.editReply(
        targetUser.id === interaction.user.id
          ? 'You don\'t have any levels yet.'
          : `${targetUser.tag} doesn't have any levels yet.`
      );
    }

    const allLevels = await Level.find({ guildId: interaction.guild.id })
      .select('-_id userId level xp')
      .sort({ level: -1, xp: -1 });

    const currentRank =
      allLevels.findIndex((level) => level.userId === targetUser.id) + 1;

    const rankCard = new canvacord.Rank()
      .setAvatar(targetUser.displayAvatarURL({ format: 'png', size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXP(fetchedLevel.level))
      .setStatus(targetMember.presence?.status || 'offline')
      .setProgressBar('#FF0000', 'COLOR')
      .setUsername(targetUser.username)
      .setDiscriminator(targetUser.discriminator);

    const data = await rankCard.build();
    const attachment = new AttachmentBuilder(data, { name: 'rank.png' });

    interaction.editReply({ files: [attachment] });
  },
};
