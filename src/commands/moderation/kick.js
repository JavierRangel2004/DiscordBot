const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
  } = require('discord.js');
  
  module.exports = {
    name: 'kick',
    description: 'Kicks a member from this server',
    options: [
      {
        name: 'target',
        description: 'The user you want to kick',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: 'reason',
        description: 'Reason for kicking',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers.valueOf()],
    botPermissions: [PermissionFlagsBits.KickMembers.valueOf()],
    callback: async (client, interaction) => {
      const targetUser = interaction.options.getUser('target');
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
  
      if (targetMember.id === interaction.guild.ownerId) {
        return interaction.editReply('You cannot kick the server owner.');
      }
  
      const targetRolePosition = targetMember.roles.highest.position;
      const requestorRolePosition = interaction.member.roles.highest.position;
      const botRolePosition = interaction.guild.members.me.roles.highest.position;
  
      if (targetRolePosition >= requestorRolePosition) {
        return interaction.editReply(
          'You cannot kick this user as they have a higher or equal role.'
        );
      }
  
      if (targetRolePosition >= botRolePosition) {
        return interaction.editReply(
          'I cannot kick this user as they have a higher or equal role.'
        );
      }
  
      try {
        await targetMember.kick(reason);
        interaction.editReply(
          `User ${targetUser.tag} was kicked. Reason: ${reason}`
        );
      } catch (error) {
        console.error('Error kicking user:', error);
        interaction.editReply('There was an error kicking this user.');
      }
    },
  };
  