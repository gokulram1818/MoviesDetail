import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // keep this if you already had it

export default defineConfig({
  plugins: [react()], // only if you’re using React plugin
  server: {
    host: true,   // exposes app to your LAN IP
    port: 5173    // optional, Vite defaults to 5173
  }
});