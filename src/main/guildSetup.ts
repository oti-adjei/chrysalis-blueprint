import { Guild, ChannelType, Collection, GuildBasedChannel } from "discord.js";
import { serverConfig } from "../config";

export class GuildSetupManager {
  private guild: Guild;

  /**
   * Initializes a new instance of the GuildSetupManager class.
   * @param {Guild} guild - The guild to set up and manage.
   */
  constructor(guild: Guild) {
    this.guild = guild;
  }

  /**
   * Fetches all channels in the guild.
   * @returns {Promise<Collection<string, GuildBasedChannel>>} - A collection of guild channels.
   */
  async fetchChannels(): Promise<Collection<string, GuildBasedChannel>> {
    const channels = await this.guild.channels.fetch();
    return channels.filter((channel) => channel !== null);
  }

  /**
   * Deletes specific channels listed in the configuration.
   * @param {Collection<string, GuildBasedChannel>} channels - The collection of channels to filter and delete.
   */
  async deleteUnwantedChannels(channels: Collection<string, GuildBasedChannel>) {
    try {
      const channelsToDelete = channels.filter((channel) =>
        serverConfig.deleteChannels.includes(channel.name)
      );

      for (const channel of channelsToDelete.values()) {
        await channel.delete("Removing unwanted channels");
        console.log(`🗑️ Deleted channel: ${channel.name}`);
      }
    } catch (error) {
      console.error("❌ Error deleting specific channels:", error);
    }
  }

  /**
   * Deletes specific categories listed in the configuration.
   * @param {Collection<string, GuildBasedChannel>} channels - The collection of channels to filter and delete categories.
   */
  async deleteUnwantedCategories(channels: Collection<string, GuildBasedChannel>) {
    try {
      const categoriesToDelete = channels.filter(
        (channel) => channel.type === ChannelType.GuildCategory && serverConfig.deleteCategories.includes(channel.name)
      );

      for (const category of categoriesToDelete.values()) {
        await category.delete("Removing unwanted categories");
        console.log(`🗑️ Deleted category: ${category.name}`);
      }
    } catch (error) {
      console.error("❌ Error deleting specific categories:", error);
    }
  }

  /**
   * Deletes all channels and categories except those listed in the configuration.
   * @param {Collection<string, GuildBasedChannel>} channels - The collection of channels to filter and delete.
   */
  async deleteAllExceptConfigured(channels: Collection<string, GuildBasedChannel>) {
    try {
      const channelsToDelete = channels.filter(
        (channel) => !serverConfig.keepChannels.includes(channel.name)
      );

      for (const channel of channelsToDelete.values()) {
        await channel.delete("Removing non-configured channels");
        console.log(`🗑️ Deleted channel: ${channel.name}`);
      }
    } catch (error) {
      console.error("❌ Error deleting channels:", error);
    }
  }

  /**
   * Deletes all channels and categories in the guild.
   * @param {Collection<string, GuildBasedChannel>} channels - The collection of channels to delete.
   */
  async deleteAllChannels(channels: Collection<string, GuildBasedChannel>) {
    try {
      for (const channel of channels.values()) {
        await channel.delete("Removing all channels");
        console.log(`🗑️ Deleted channel: ${channel.name}`);
      }
    } catch (error) {
      console.error("❌ Error deleting all channels:", error);
    }
  }

  /**
   * Creates new categories in the guild as per the configuration.
   */
  async createCategories() {
    try {
      for (const category of serverConfig.categories) {
        await this.guild.channels.create({
          name: category.name,
          type: ChannelType.GuildCategory,
        });
      }
    } catch (error) {
      console.error("❌ Error creating categories:", error);
    }
  }

  /**
   * Creates new text channels in the guild under specified categories.
   */

  //TODO: Work on creating text channels under categories
  // async createTextChannels() {
  //   try {
  //     for (const category of serverConfig.categories) {
  //       for (const channel of category.textChannels) {
  //         await this.guild.channels.create({
  //           name: channel,
  //           type: ChannelType.GuildText,
  //           parent: category.id,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("❌ Error creating text channels:", error);
  //   }
  // }

  /**
   * Creates new voice channels in the guild under specified categories.
   */

  //TODO: Work on creating voice channels under categories
  // async createCategorizedVoiceChannels() {
  //   try {
  //     const categories = await this.guild.channels.fetch();
  //     if (categories.size === 0) {
  //       console.log("No categories found in the server.");
  //       return;
  //     }
   
  //     const categoryChannels = categories.filter(channel => channel.type === ChannelType.GuildCategory);

  //     i

     

  //     for (const category of categoryChannels) {
  //       const serverConfigCategory = serverConfig.categories.find(configCategory => configCategory.name === category.name);
  //       if (serverConfigCategory && serverConfigCategory.voiceChannels) {
  //         for (const vc of serverConfigCategory.voiceChannels) {
  //           await this.guild.channels.create({
  //             name: vc,
  //             type: ChannelType.GuildVoice,
  //             parent: category,
  //           });
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("❌ Error creating voice channels under categories:", error);
  //   }
  // }

  /**
   * Creates standalone voice channels in the guild.
   */
  async createStandaloneVoiceChannels() {
    try {
      for (const vc of serverConfig.voiceChannels) {
        await this.guild.channels.create({
          name: vc,
          type: ChannelType.GuildVoice,
        });
      }
    } catch (error) {
      console.error("❌ Error creating standalone voice channels:", error);
    }
  }

  /**
   * Sets up a new server with predefined categories, text channels, and voice channels.
   * Also creates standalone voice channels (not under any category).
   * @throws {Error} If there's an error creating channels.
   */
  async setupNewServer() {
    try {
      console.log("🚀 Setting up the server...");
      // Create categories with text and voice channels
      for (const category of serverConfig.categories) {
        const categoryChannel = await this.guild.channels.create({
          name: category.name,
          type: ChannelType.GuildCategory,
        });
  
        // Create text channels under the category
        for (const channel of category.textChannels) {
          await this.guild.channels.create({
            name: channel,
            type: ChannelType.GuildText,
            parent: categoryChannel.id,
          });
        }
  
        // Create voice channels under the category
        if (category.voiceChannels) {
          for (const vc of category.voiceChannels) {
            await this.guild.channels.create({
              name: vc,
              type: ChannelType.GuildVoice,
              parent: categoryChannel.id,
            });
          }
        }
      }
  
      // Create standalone voice channels (not under any category)
      for (const vc of serverConfig.voiceChannels) {
        await this.guild.channels.create({
          name: vc,
          type: ChannelType.GuildVoice,
        });
      }
  
      console.log("✅ Server setup completed with categorized and standalone voice channels!");
    } catch (error) {
      console.error("❌ Error setting up channels:", error);
    }
  }
  

  /**
   * Sets up the server with predefined categories and channels.
   */
  async setupServer() {
    console.log("🚀 Setting up the server...");
    const channels = await this.fetchChannels();
    await this.createCategories();
    // await this.createTextChannels();
    // await this.createCategorizedVoiceChannels();
    await this.createStandaloneVoiceChannels();
    console.log("✅ Server setup completed!");
  }

  /**
   * Deletes all channels and categories in the server.
   */
  async deleteServer() {
    console.log("🚀 Deleting the server...");
    const channels = await this.fetchChannels();
    await this.deleteAllChannels(channels);
    console.log("✅ Server deleted!");
  }

  /**
   * Updates the server by deleting unwanted channels and categories and recreating configured ones.
   */
  async updateServer() {
    console.log("🚀 Updating the server...");
    const channels = await this.fetchChannels();
    await this.deleteUnwantedChannels(channels);
    await this.deleteUnwantedCategories(channels);
    await this.deleteAllExceptConfigured(channels);

    await this.createCategories();
    // await this.createTextChannels();
    // await this.createCategorizedVoiceChannels();
    await this.createStandaloneVoiceChannels();
    console.log("✅ Server updated!");
  }
}


/*import { Client, GatewayIntentBits, ChannelType, Guild } from "discord.js";
import "dotenv/config";

const TOKEN = process.env.BOT_TOKEN!;
const GUILD_ID = process.env.GUILD_ID!;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

export class GuildSetupManager {
  private guild: Guild;

  private categories = [
    { name: "📜 Rules & Info", channels: ["welcome", "faq", "roles"] },
    { name: "📢 Announcements", channels: ["server-news", "community-events", "content-updates"] },
    { name: "💬 Community Hub", channels: ["general-chat", "off-topic", "memes", "introductions", "international-chat"] },
    { name: "🎮 Gaming Zone", channels: ["game-discussions", "looking-for-group", "clips-and-highlights"] },
    { name: "💻 Code & Tech Zone", channels: ["coding-discussions", "frontend-dev", "backend-dev", "ai-ml", "help-and-debugging"] },
    { name: "📸 Content Creation & Media", channels: ["content-showcase", "photo-videography", "design-art"] },
    { name: "🤝 Networking & Collaborations", channels: ["project-collabs", "job-opportunities", "learning-resources"] },
    { name: "🚀 Share Your Work", channels: ["web-projects", "game-development", "discord-bots", "github-showcase"] },
    { name: "🎙️ Live Events & Interactions", channels: ["live-streams", "live-chat", "community-votes"] },
    { name: "🛠️ Help & Support", channels: ["ask-for-help", "bug-reports"] },
    { name: "💎 VIP Zone", channels: ["vip-lounge", "exclusive-announcements"] },
  ];

  private voiceChannels = [
    "🎤 Community",
    "🎮 Gaming",
    "📢 PPS Live",
    "🕹️ Game Room 1",
    "🕹️ Game Room 2",
    "🕹️ Game Room 3",
    "🎥 Stream Hangout",
  ];

  constructor(guild: Guild) {
    this.guild = guild;
  }

  async setupTextChannels() {
    for (const category of this.categories) {
      const categoryChannel = await this.guild.channels.create({
        name: category.name,
        type: ChannelType.GuildCategory,
      });

      for (const channel of category.channels) {
        await this.guild.channels.create({
          name: channel,
          type: ChannelType.GuildText,
          parent: categoryChannel.id,
        });
      }
    }
  }

  async setupVoiceChannels() {
    for (const vc of this.voiceChannels) {
      await this.guild.channels.create({
        name: vc,
        type: ChannelType.GuildVoice,
      });
    }
  }

  async setupServer() {
    console.log("🚀 Setting up the server...");
    await this.setupTextChannels();
    await this.setupVoiceChannels();
    console.log("✅ Server setup completed!");
  }
}*/


