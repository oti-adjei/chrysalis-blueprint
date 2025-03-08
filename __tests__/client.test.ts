import { Client, GatewayIntentBits } from "discord.js";

describe("Discord Client", () => {
  it("should create a client with the correct intents", () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    expect(client).toBeDefined();
    expect(client.options.intents.has(GatewayIntentBits.Guilds)).toBe(true);
  });
});
