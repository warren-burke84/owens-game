// vite/config.dev.mjs
import { defineConfig } from "file:///workspaces/owens-game/node_modules/vite/dist/node/index.js";
var config_dev_default = defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"]
        }
      }
    }
  },
  server: {
    port: 8080
  }
});
export {
  config_dev_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS9jb25maWcuZGV2Lm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2VzL293ZW5zLWdhbWUvdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvb3dlbnMtZ2FtZS92aXRlL2NvbmZpZy5kZXYubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL293ZW5zLWdhbWUvdml0ZS9jb25maWcuZGV2Lm1qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6ICcuLycsXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICAgICAgICAgIHBoYXNlcjogWydwaGFzZXInXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiA4MDgwXG4gICAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1RLFNBQVMsb0JBQW9CO0FBRWhTLElBQU8scUJBQVEsYUFBYTtBQUFBLEVBQ3hCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNILGVBQWU7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNKLGNBQWM7QUFBQSxVQUNWLFFBQVEsQ0FBQyxRQUFRO0FBQUEsUUFDckI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxFQUNWO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
