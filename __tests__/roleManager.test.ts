import { Guild } from "discord.js";
import { RoleManager } from "../src/main/roleManager";

jest.mock("discord.js", () => ({
  Guild: jest.fn(),
}));

describe("RoleManager", () => {
  let guild: jest.Mocked<Guild>;
  let roleManager: RoleManager;

  beforeEach(() => {
    guild = {
      roles: { create: jest.fn(), delete: jest.fn() },
    } as unknown as jest.Mocked<Guild>;
    roleManager = new RoleManager(guild);
  });

  it("should create a role", async () => {
    await roleManager.createRole("Moderator", "#ff0000");
    expect(guild.roles.create).toHaveBeenCalledWith({
      name: "Moderator",
      color: "#ff0000",
    });
  });
});
