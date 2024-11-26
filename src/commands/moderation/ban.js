const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bans a member from this server',
  default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
  options: [
    {
      name: 'target',
      description: 'The user you want to ban',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'reason',
      description: 'Reason for banning',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers.valueOf()],
  botPermissions: [PermissionFlagsBits.BanMembers.valueOf()],
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
      return interaction.editReply('You cannot ban the server owner.');
    }

    const targetRolePosition = targetMember.roles.highest.position;
    const requestorRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetRolePosition >= requestorRolePosition) {
      return interaction.editReply(
        'You cannot ban this user as they have a higher or equal role.'
      );
    }

    if (targetRolePosition >= botRolePosition) {
      return interaction.editReply(
        'I cannot ban this user as they have a higher or equal role.'
      );
    }

    try {
      await targetMember.ban({ reason });
      interaction.editReply(
        `User ${targetUser.tag} was banned. Reason: ${reason}`
      );
    } catch (error) {
      console.error('Error banning user:', error);
      interaction.editReply('There was an error banning this user.');
    }
  },
};
