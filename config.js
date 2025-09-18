module.exports = {
    // Bot Configuration
    DISCORD_TOKEN: process.env.DISCORD_TOKEN || "YOUR_BOT_TOKEN_HERE",
    BOT_ID: process.env.BOT_ID || "YOUR_BOT_ID_HERE",
    
    // Server Configuration
    SERVER_ID: process.env.SERVER_ID || "YOUR_SERVER_ID_HERE",
    OWNER_ID: process.env.OWNER_ID || "YOUR_OWNER_ID_HERE",
    
    // Optional: Log Channel ID (for antinuke logs)
    LOG_CHANNEL_ID: process.env.LOG_CHANNEL_ID || null,
    
    // Bot Settings
    PREFIX: process.env.PREFIX || "!",
    STATUS_MESSAGE: process.env.STATUS_MESSAGE || "Protecting servers 🛡️",
    STATUS_TYPE: process.env.STATUS_TYPE || "WATCHING", // PLAYING, WATCHING, LISTENING, STREAMING
    
    // Colors for embeds (hex codes)
    COLORS: {
        SUCCESS: "#00ff00",
        ERROR: "#ff0000",
        WARNING: "#ffff00",
        INFO: "#0099ff",
        PRIMARY: "#5865f2"
    }
};

/*
SECURITY NOTICE:
For production use, it's recommended to use environment variables instead of hardcoding values.

In Pterodactyl Panel:
1. Go to your server's "Startup" tab
2. Add these environment variables:
   - DISCORD_TOKEN=your_bot_token
   - BOT_ID=your_bot_id
   - SERVER_ID=your_server_id
   - OWNER_ID=your_owner_id

Or create a .env file (not recommended for production):
DISCORD_TOKEN=your_bot_token
BOT_ID=your_bot_id
SERVER_ID=your_server_id
OWNER_ID=your_owner_id
*/