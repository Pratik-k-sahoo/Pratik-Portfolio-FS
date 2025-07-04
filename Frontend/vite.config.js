import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/v1": {
				target: "https://pratik-portfolio-fs-backend.onrender.com/api",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [react(), svgr()],
});
