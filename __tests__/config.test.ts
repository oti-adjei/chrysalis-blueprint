import { serverConfig } from "../src/config";

describe("Server Config", () => {
  it("should have categories, voiceChannels, and roles defined", () => {
    expect(serverConfig.categories).toBeDefined();
    expect(serverConfig.voiceChannels).toBeDefined();
    expect(serverConfig.roles).toBeDefined();
  });
//   it("should contain predefined categories", () => {
//     expect(serverConfig.categories.some(c => c.name === "📜 Rules & Info")).toBe(true);
//   });

//Test for Test Server
it("should contain predefined categories", () => {
    expect(serverConfig.categories.some(c => c.name === "TEXT CHANNELS")).toBe(true);
  });

it("should contain predefined textChannels", () => {
    expect(serverConfig.categories.some(c => c.textChannels.some(tc => tc === "music"))).toBe(true);
  });

it("should contain predefined voiceChannels", () => {
    expect(serverConfig.voiceChannels.some(c => c === "🎶 Music Lounge")).toBe(true);
  });

it("should contain predefined roles", () => {
    expect(serverConfig.roles.some(c => c.name === "Member")).toBe(true);
  });

it
});
