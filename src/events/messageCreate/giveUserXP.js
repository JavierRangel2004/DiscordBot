const Level = require('../../models/level');
const calculateLevelXP = require('../../utils/calculateLevelXP');

const cooldowns = new Set();

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot || cooldowns.has(message.author.id))
    return;

  cooldowns.add(message.author.id);
  setTimeout(() => cooldowns.delete(message.author.id), 60000); // 60 seconds cooldown

  const xpToGive = Math.floor(Math.random() * 11) + 5; // XP between 5 and 15
  const query = { userId: message.author.id, guildId: message.guild.id };

  try {
    let level = await Level.findOne(query);

    if (level) {
      level.xp += xpToGive;

      if (level.xp >= calculateLevelXP(level.level)) {
        level.xp = 0;
        level.level += 1;
        message.channel.send(
          `${message.member} has leveled up to level ${level.level}!`
        );
      }

      await level.save();
    } else {
      const newLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
      });

      await newLevel.save();
    }
  } catch (error) {
    console.error('Error updating XP:', error);
  }
};
