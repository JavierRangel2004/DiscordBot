const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
  } = require('discord.js');
  const ms = require('ms');
  (async () => {
    const prettyMs = await import('pretty-ms');
    // Tu lógica con prettyMs aquí
  })();
  
  
  module.exports = {
    name: 'timeout',
    description: 'Timeout a user for a specified duration.',
    options: [
      {
        name: 'target',
        description: 'The user to timeout',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: 'duration',
        description: 'Duration of the timeout (e.g., 10m, 1h, 1d)',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'reason',
        description: 'Reason for the timeout',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
    permissionsRequired: [PermissionFlagsBits.ModerateMembers.valueOf()],
    botPermissions: [PermissionFlagsBits.ModerateMembers.valueOf()],
    callback: async (client, interaction) => {
      const targetUser = interaction.options.getUser('target');
      const durationInput = interaction.options.getString('duration');
      const reason =
        interaction.options.getString('reason') || 'No reason provided';
  
      await interaction.deferReply();
  
      const targetMember = await interaction.guild.members
        .fetch(targetUser.id)
        .catch(() => null);
  
      if (!targetMember) {
        return interaction.editReply(
          'That user does not exist in this server.'
        );
      }
  
      if (targetMember.user.bot) {
        return interaction.editReply('You cannot timeout a bot.');
      }
  
      const msDuration = ms(durationInput);
      if (
        !msDuration ||
        msDuration < 5000 ||
        msDuration > 28 * 24 * 60 * 60 * 1000
      ) {
        return interaction.editReply(
          'Invalid duration. Must be between 5 seconds and 28 days.'
        );
      }
  
      const targetRolePosition = targetMember.roles.highest.position;
      const requestorRolePosition = interaction.member.roles.highest.position;
      const botRolePosition = interaction.guild.members.me.roles.highest.position;
  
      if (targetRolePosition >= requestorRolePosition) {
        return interaction.editReply(
          'You cannot timeout this user as they have a higher or equal role.'
        );
      }
  
      if (targetRolePosition >= botRolePosition) {
        return interaction.editReply(
          'I cannot timeout this user as they have a higher or equal role.'
        );
      }
  
      try {
        const formattedDuration = prettyMs(msDuration, { verbose: true });
        await targetMember.timeout(msDuration, reason);
  
        interaction.editReply(
          `${targetUser.tag} was timed out for ${formattedDuration}.\nReason: ${reason}`
        );
      } catch (error) {
        console.error('Error timing out user:', error);
        interaction.editReply('There was an error executing the timeout command.');
      }
    },
  };
  