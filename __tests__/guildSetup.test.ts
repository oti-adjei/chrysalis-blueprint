import { Guild, Collection } from "discord.js";
import { GuildSetupManager } from "../src/main/guildSetup";

jest.mock("discord.js", () => ({
  Guild: jest.fn(),
}));

const mockGuild = {
    channels: {
      fetch: jest.fn().mockResolvedValue(new Collection()), // ✅ Mock channels.fetch
    },
  };
  

describe("GuildSetupManager", () => {
  let guild: jest.Mocked<Guild>;
  let setupManager: GuildSetupManager;

  beforeEach(() => {
    guild = { channels: { create: jest.fn() } } as unknown as jest.Mocked<Guild>;
    setupManager = new GuildSetupManager(guild);
  });

  it("should create categories and channels", async () => {
    await setupManager.setupServer();
    expect(guild.channels.create).toHaveBeenCalled();
  });
});
