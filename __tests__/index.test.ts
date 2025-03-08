import { Client } from "discord.js";
import "../src/index"; // Ensure index.ts is executed

jest.mock("discord.js", () => {
  const actualDiscord = jest.requireActual("discord.js");

  return {
    ...actualDiscord,
    Client: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      login: jest.fn(),
    })),
  };
});

describe("Bot Initialization", () => {
  it("should initialize the bot and log in", () => {
    const mockLogin = jest.fn();
    const MockedClient = Client as unknown as jest.Mock;

    MockedClient.mockImplementation(() => ({
      on: jest.fn(),
      login: mockLogin,
    }));

    require("../src/index"); // Trigger the bot startup
    expect(mockLogin).toHaveBeenCalled();
  });
});
