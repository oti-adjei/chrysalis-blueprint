import { createClient } from "./main/client";
import "dotenv/config";
// import { GuildSetupManager } from "./main/guildSetup";
// import { RoleManager } from "./main/roleManager";

const TOKEN = process.env.BOT_TOKEN!;
const GUILD_ID = process.env.GUILD_ID!;

const client = createClient();



client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    if (!guild) throw new Error("❌ Guild not found. Check GUILD_ID.");

    console.log(`✅ Connected to guild: ${guild.name}`);

    // // Initialize managers
    // const setupManager = new GuildSetupManager(guild);
    // const roleManager = new RoleManager(guild);
    // const roles = await roleManager.fetchRoles();

    // // Setup Server (Categories & Channels)
    // await setupManager.setupServer();

    // // Manage Roles
    // await roleManager.createRole("Moderator", "#ff0000"); // Red Moderator role
    // await roleManager.createRole("VIP", "#ffd700"); // Gold VIP role
    // await roleManager.createRole("NewRole", "#00ff00"); // Example: Green Role
    // await roleManager.deleteUnwantedRoles(roles);
    // await roleManager.deleteAllExceptConfiguredRoles(roles);
    // await roleManager.deleteAllRoles(roles);

    console.log("✅ Setup completed. Logging out...");

  } catch (error) {
    console.error("❌ Error during setup:", error);
  } 
  //only if you want to run as script and exit
  finally {
    client.destroy(); // Disconnect the bot
    process.exit(0); // Ensure script exits
  }
});

client.login(TOKEN);
