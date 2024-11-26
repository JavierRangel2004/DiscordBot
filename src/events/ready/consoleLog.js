const { ActivityType } = require('discord.js');

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}`);

  const statusArray = [
    {
      name: 'Viendo fotos...',
      type: ActivityType.Watching,
      url: 'https://jrmgraphy.com',
    },
    {
      name: 'Jugando con amigos',
      type: ActivityType.Playing,
    },
    {
      name: 'Escuchando música',
      type: ActivityType.Listening,
    },
    // Add more statuses if needed
  ];

  let index = 0;
  function updateStatus() {
    const status = statusArray[index];
    client.user.setActivity(status);
    index = (index + 1) % statusArray.length;
  }

  updateStatus();
  setInterval(updateStatus, 10000); // Update every 10 seconds
};
