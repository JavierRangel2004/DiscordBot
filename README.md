# DiscordBot

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18.0.0-blue.svg)
![Docker](https://img.shields.io/badge/docker-available-blue.svg)

A versatile Discord bot built with [Discord.js](https://discord.js.org/) and [MongoDB](https://www.mongodb.com/), featuring economy systems, moderation tools, and more. Easily deployable using Docker and customizable to fit your server's needs.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Config File](#config-file)
- [Usage](#usage)
  - [Running the Bot](#running-the-bot)
  - [Deploying Commands](#deploying-commands)
  - [Using Docker](#using-docker)
- [Commands](#commands)
  - [Miscellaneous Commands](#miscellaneous-commands)
  - [Economy Commands](#economy-commands)
  - [Moderation Commands](#moderation-commands)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to **DiscordBot**, a feature-rich Discord bot designed to enhance your server with various functionalities, including moderation tools, an economy system, and interactive commands. Built with scalability and ease of deployment in mind, this bot leverages the power of Node.js, Discord.js, and MongoDB.

## Features

- **Moderation Tools:** Kick, ban, and timeout users with ease.
- **Economy System:** Implement daily rewards and track user balances.
- **Leveling System:** Encourage engagement by tracking and displaying user levels.
- **Custom Commands:** Easily add or modify commands to suit your server's needs.
- **Docker Support:** Simplify deployment with Docker and Docker Compose.
- **Interactive Status:** Dynamic bot status messages to keep your server engaged.

## Installation

### Prerequisites

Before setting up the DiscordBot, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (if not using Docker)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (optional, for Docker deployment)

### Clone the Repository

```bash
git clone https://github.com/JavierRangel2004/DiscordBot.git
cd DiscordBot
```

### Install Dependencies

Install the required npm packages:

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```env
TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_client_id
GUILD_ID=your_test_guild_id
MONGODB_URI=your_mongodb_connection_string
```

- `TOKEN`: Your Discord bot token.
- `CLIENT_ID`: Your Discord application's client ID.
- `GUILD_ID`: The ID of your Discord server where you want to deploy commands.
- `MONGODB_URI`: Your MongoDB connection string.

### Config File

Edit the `config.json` file to include developer IDs and test server ID:

```json
{
  "devs": ["your_developer_id"],
  "testServer": "your_test_server_id"
}
```

- `devs`: An array of Discord user IDs who are considered developers.
- `testServer`: The ID of the Discord server used for testing commands.

## Usage

### Running the Bot

To start the bot in development mode with auto-reloading:

```bash
npm run dev
```

To start the bot normally:

```bash
npm start
```

### Deploying Commands

Before using the bot's commands, you need to deploy them to your Discord server.

```bash
npm run deploy-commands
```

This script reads all command files and registers them with your specified guild.

### Using Docker

Docker simplifies the deployment process. Ensure you have Docker and Docker Compose installed.

1. **Build and Start the Containers:**

   ```bash
   docker-compose up --build
   ```

2. **Accessing the Bot:**

   The bot will be running inside a Docker container and connected to a MongoDB instance also running in a container.

3. **Stopping the Containers:**

   ```bash
   docker-compose down
   ```

**Note:** Ensure your `.env` file is properly configured as Docker Compose uses it to set environment variables.

## Commands

### Miscellaneous Commands

- **`/add`**: Adds two numbers together.
  - **Options:**
    - `num1` (Number, required): The first number.
    - `num2` (Number, required): The second number.

- **`/ping`**: Replies with the bot's ping.

- **`/hey`**: Replies with "Hey!".

### Economy Commands

- **`/daily`**: Collect your daily reward.
  - **Description:** Users can collect a daily amount of in-bot currency to encourage regular engagement.

- **`/level`**: Displays your or someone else's level.
  - **Options:**
    - `target_user` (User, optional): The user whose level you want to see.

### Moderation Commands

- **`/timeout`**: Timeout a user for a specified duration.
  - **Options:**
    - `target` (User, required): The user to timeout.
    - `duration` (String, required): Duration of the timeout (e.g., 10m, 1h, 1d).
    - `reason` (String, optional): Reason for the timeout.

- **`/kick`**: Kicks a member from the server.
  - **Options:**
    - `target` (User, required): The user to kick.
    - `reason` (String, optional): Reason for kicking.

- **`/ban`**: Bans a member from the server.
  - **Options:**
    - `target` (User, required): The user to ban.
    - `reason` (String, optional): Reason for banning.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

Please ensure your code follows the existing style and includes necessary documentation.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please reach out to:

- **Email:** [inspec_jrm@gmail.com](mailto:inspec_jrm@gmail.com)
- **GitHub:** [JavierRangel2004](https://github.com/JavierRangel2004)

---

Happy Discording! 🎉