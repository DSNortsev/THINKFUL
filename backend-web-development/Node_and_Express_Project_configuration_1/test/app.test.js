const fs = require("fs");
const path = require("path");
const app = require("../src/app");
const request = require('supertest');

describe("app.js file", () => {
  it("should have an app.js file in the src/ directory", () => {
    const appPath = path.join(__dirname, "..", "src", "app.js");
    const content = fs.existsSync(appPath);
    expect(content).toBe(true);
  });

  it("should be able to receive a request", async () => {
    return request(app)
      .get("/")
      .expect(404);
  });
});
