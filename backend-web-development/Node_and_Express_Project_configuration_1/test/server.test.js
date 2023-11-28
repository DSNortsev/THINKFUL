const fs = require("fs");
const path = require("path");
const app = require("../src/app");

describe("server.js file", () => {
  it("should have a server.js file in the src/ directory", () => {
    const serverPath = path.join(__dirname, "..", "src", "server.js");
    const content = fs.existsSync(serverPath);
    expect(content).toBe(true);
  });

  it("should run the server (use app.listen) in the server.js file", () => {
    const serverPath = path.join(__dirname, "..", "src", "server.js");
    const content = fs.readFileSync(serverPath, "utf-8");
    expect(content).toContain(".listen");
  });
});
