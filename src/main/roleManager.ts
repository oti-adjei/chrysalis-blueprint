import { Guild, Role, Collection, ColorResolvable } from "discord.js";
import { serverConfig } from "../config";

export class RoleManager {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  // Fetch all roles once (to avoid multiple API calls)
  async fetchRoles(): Promise<Collection<string, Role>> {
    return await this.guild.roles.fetch();
  }

  // 🗑️ Delete only the roles listed in config
  async deleteUnwantedRoles(roles: Collection<string, Role>) {
    try {
      const rolesToDelete = roles.filter((role) =>
        serverConfig.deleteRoles.includes(role.name)
      );

      for (const role of rolesToDelete.values()) {
        await role.delete("Cleaning up unwanted roles");
        console.log(`🗑️ Deleted role: ${role.name}`);
      }
    } catch (error) {
      console.error("❌ Error deleting roles:", error);
    }
  }

  // 🗑️ Delete ALL roles EXCEPT those listed in config
  async deleteAllExceptConfiguredRoles(roles: Collection<string, Role>) {
    try {
      const rolesToDelete = roles.filter(
        (role) => !serverConfig.keepRoles.includes(role.name) // Keep only specified roles
      );

      for (const role of rolesToDelete.values()) {
        await role.delete("Removing non-configured roles");
        console.log(`🗑️ Deleted role: ${role.name}`);
      }
    } catch (error) {
      console.error("❌ Error deleting roles:", error);
    }
  }

  // ❌🗑️ Delete ALL roles (except system roles like @everyone)
  async deleteAllRoles(roles: Collection<string, Role>) {
    try {
      const rolesToDelete = roles.filter((role) => role.name !== "@everyone");

      for (const role of rolesToDelete.values()) {
        await role.delete("Removing all roles");
        console.log(`🗑️ Deleted role: ${role.name}`);
      }
    } catch (error) {
      console.error("❌ Error deleting all roles:", error);
    }
  }

  /**
   * Creates a new role with a given name and optional color
   * @param {string} roleName - Name of the role to create
   * @param {string} [color] - Optional hex color code (e.g., "#ff0000" for red)
   */
  async createRole(roleName: string, color?: ColorResolvable) {
    try {
      const role = await this.guild.roles.create({
        name: roleName,
        color: color || "Default",
      });
      console.log(`✅ Created role: ${role.name}`);
    } catch (error) {
      console.error(`❌ Error creating role ${roleName}:`, error);
    }
  }
}


/*import { Client, GatewayIntentBits, Role, Guild, ColorResolvable } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN!;
const GUILD_ID = process.env.GUILD_ID!;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Roles to keep
const rolesToKeep = new Set(["carl-bot", "DS.ME", "BotRix", "Spoticord Music", "ChrysalisBlueprint"]);

export class RoleManager {
  private guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  // /**
  //  * Deletes all roles except the ones in `rolesToKeep`
  //  
  async deleteUnwantedRoles() {
    try {
      const roles = await this.guild.roles.fetch();

      roles.forEach(async (role: Role | null) => {
        if (role && !rolesToKeep.has(role.name) && !role.managed) {
          try {
            await role.delete();
            console.log(`Deleted role: ${role.name}`);
          } catch (error) {
            console.error(`Cannot delete role: ${role.name}`, error);
          }
        }
      });

      console.log("Role cleanup complete.");
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  // /**
  //  * Creates a new role with a given name and optional color
  //  * @param {string} roleName - Name of the role to create
  //  * @param {string} [color] - Optional hex color code (e.g., "#ff0000" for red)
  //  
  async createRole(roleName: string, color?: ColorResolvable) {
    try {

      const role = await this.guild.roles.create({
        name: roleName,
        color: color || "Default",
      });
      console.log(`Created role: ${role.name}`);
    } catch (error) {
      console.error(`Error creating role ${roleName}:`, error);
    }
  }
}*/


