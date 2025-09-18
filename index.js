const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { QuickDB } = require('quick.db');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Initialize Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember
    ]
});

// Initialize database
const db = new QuickDB();

// Initialize collections
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.db = db;

// Load command files
const commandsPath = path.join(__dirname, 'src', 'commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
    }
}

// Load event files
const eventsPath = path.join(__dirname, 'src', 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

// Load handlers
const handlersPath = path.join(__dirname, 'src', 'handlers');
client.handlers = new Collection();
if (fs.existsSync(handlersPath)) {
    const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.js'));
    
    for (const file of handlerFiles) {
        const filePath = path.join(handlersPath, file);
        const handler = require(filePath);
        
        // Store handler for potential custom button handling
        client.handlers.set(file.replace('.js', ''), handler);
        
        if (handler.buttons) {
            for (const [key, value] of Object.entries(handler.buttons)) {
                client.buttons.set(key, value);
            }
        }
        
        if (handler.menus) {
            for (const [key, value] of Object.entries(handler.menus)) {
                client.menus.set(key, value);
            }
        }
    }
}

// Error handling
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});

// Login to Discord
client.login(config.DISCORD_TOKEN);