/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				background: "hsl(210, 40%, 98%)",
				foreground: "hsl(222, 84%, 4.9%)",
				card: "hsl(0, 0%, 100%)",
				"card-foreground": "hsl(222, 84%, 4.9%)",
				popover: "hsl(0, 0%, 100%)",
				"popover-foreground": "hsl(222, 84%, 4.9%)",
				primary: "hsl(195, 100%, 50%)",
				"primary-foreground": "hsl(210, 40%, 98%)",
				secondary: "hsl(210, 40%, 94%)",
				"secondary-foreground": "hsl(222, 84%, 4.9%)",
				muted: "hsl(210, 40%, 94%)",
				"muted-foreground": "hsl(215, 16%, 47%)",
				accent: "hsl(332, 84%, 60%)",
				"accent-foreground": "hsl(210, 40%, 98%)",
				destructive: "hsl(0, 84%, 60%)",
				"destructive-foreground": "hsl(210, 40%, 98%)",
				border: "hsl(214, 32%, 91%)",
				input: "hsl(214, 32%, 91%)",
				ring: "hsl(195, 100%, 50%)",
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, hsl(195, 100%, 50%), hsl(210, 100%, 60%))',
				'gradient-secondary': 'linear-gradient(135deg, hsl(332, 84%, 60%), hsl(300, 100%, 70%))',
				'gradient-hero': 'linear-gradient(135deg, hsl(195, 100%, 50%), hsl(210, 100%, 60%), hsl(332, 84%, 60%))',
				'gradient-subtle': 'linear-gradient(180deg, hsl(210, 40%, 98%), hsl(210, 40%, 94%))',
			},
			boxShadow: {
				elegant: "0 10px 30px -10px hsl(195, 100%, 50%, 0.3)",
				glow: "0 0 40px hsl(210, 100%, 60%, 0.4)",
			},
			animation: {
				float: "float 3s ease-in-out infinite",
				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
				particles: "particles 8s linear infinite",
				drift: "drift 4s ease-in-out infinite",
				sparkle: "sparkle 2s ease-in-out infinite",
			},
			keyframes: {
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-20px)" },
				},
				"pulse-glow": {
					"0%, 100%": { boxShadow: "0 0 5px hsl(195, 100%, 50%, 0.5)" },
					"50%": {
						boxShadow:
							"0 0 20px hsl(195, 100%, 50%, 0.8), 0 0 30px hsl(195, 100%, 50%, 0.6)",
					},
				},
				particles: {
					"0%": {
						transform: "translateY(0px) rotate(0deg)",
						opacity: "1",
					},
					"100%": {
						transform: "translateY(-100vh) rotate(360deg)",
						opacity: "0",
					},
				},
				drift: {
					"0%, 100%": { transform: "translateX(0px)" },
					"50%": { transform: "translateX(30px)" },
				},
				sparkle: {
					"0%, 100%": {
						opacity: "0",
						transform: "scale(0) rotate(0deg)",
					},
					"50%": {
						opacity: "1",
						transform: "scale(1) rotate(180deg)",
					},
				},
			},
		},
	},
	plugins: [],
};
