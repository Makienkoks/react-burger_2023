import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    refreshToken: 'c6e2820b1adb383b865f06a41537cf25588ec69a7c4466980e55665d98aafdcd1a6ca4a11a255dc2',
    accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2NkNjliOGE0YjYyMDAxYzg1NDdiMSIsImlhdCI6MTY4NTkzOTU4NCwiZXhwIjoxNjg1OTQwNzg0fQ.-jd0PuDJG___pM_MQLbUNg9ntl6QvWL8agT9ECud9n0',
  },
});
