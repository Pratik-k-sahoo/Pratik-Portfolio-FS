/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "serif"],
				serif: ["Calistoga", "serif"],
			},
			animation: {
				"ping-large": "ping-large 1s ease-in-out infinite",
				"move-left": "move-left 1s linear infinite",
				"move-right": "move-right 1s linear infinite",
        "wave": "wave 1.5s linear infinite",
			},
			keyframes: {
				"ping-large": {
					"75%, 100%": {
						transform: "scale(3)",
						opacity: "0",
					},
				},
				"move-left": {
					"0%": {
						transform: "translateX(0%)",
					},
					"100%": {
						transform: "translateX(-50%)",
					},
				},
				"move-right": {
					"0%": {
						transform: "translateX(-50%)",
					},
					"100%": {
						transform: "translateX(0%)",
					},
				},
				"wave": {
					"0%": {
						transform: "rotate(0deg)",
					},
					"10%": {
						transform: "rotate(14.0deg)",
					},
					"20%": {
						transform: "rotate(-8.0deg)",
					},
					"30% ": {
						transform: "rotate(14.0deg)",
					},
					"40%": {
						transform: "rotate(-4.0deg)",
					},
					"50%": {
						transform: "rotate(10.0deg)",
					},
					"60%": {
						transform: "rotate(-6.0deg)",
					},
					"70%": {
						transform: "rotate(10.0deg)",
					},
					"80%": {
						transform: "rotate(-2.0deg)",
					},
					"90%": {
						transform: "rotate(8.0deg)",
					},
					"100%": {
						transform: "rotate(0deg)",
					},
				},
			},
		},
		screens: {
			sm: "320px",
			md: "768px",
			lg: "1200px",
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				md: "2rem",
			},
		},
	},
	plugins: [],
};
