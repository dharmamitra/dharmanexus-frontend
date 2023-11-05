import { defineConfig } from "cypress";
import * as fs from "fs";

export default defineConfig({
  // projectId: "ebjoi2",
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      on("task", {
        // deconstruct the individual properties
        readDirectory(directory) {
          return fs.readdirSync(directory);
        },
      });
    },
    baseUrl: "http://localhost:3000",
  },
});