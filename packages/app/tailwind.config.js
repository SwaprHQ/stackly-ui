/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["system-ui", "sans-serif"], // will be Stabil Grotesk
    },
    colors: {
      primary: {
        25: "#F9FFF4",
        50: "#F1FFE4",
        75: "#E3FFCA",
        100: "#D7FBB8",
        200: "#C7F79E",
        300: "#B8EF88",
        400: "#A2E771",
        500: "#97DF5C",
        600: "#87CE4C",
        700: "#6EB436",
        800: "#375C19",
        900: "#122404",
      },
      gray: {
        25: "#F8F8F7",
        50: "#F3F4F2",
        75: "#ECEDEB",
        100: "#E2E4E1",
        200: "#D9DBD7",
        300: "#C5C9C2",
        400: "#B2B8AE",
        500: "#8C9486",
        600: "#65705D",
        700: "#44513A",
        800: "#2C3B20",
        900: "#0F2002",
      },
      "gray-alpha": {
        25: "rgba(15, 32, 2, 0.03)",
        50: "rgba(15, 32, 2, 0.05)",
        75: " rgba(15, 32, 2, 0.08)",
        100: "rgba(15, 32, 2, 0.12)",
        200: "rgba(15, 32, 2, 0.16)",
        300: "rgba(15, 32, 2, 0.24)",
        400: "rgba(15, 32, 2, 0.32)",
        500: "rgba(15, 32, 2, 0.48)",
        600: "rgba(15, 32, 2, 0.64)",
        700: "rgba(15, 32, 2, 0.78)",
        800: "rgba(15, 32, 2, 0.88)",
        900: "rgba(15, 32, 2, 0.93)",
      },
      danger: {
        75: "#FFE0E0",
        200: "#FFA7A7",
        500: "#F03D3D",
        600: "#CF2A2A",
      },
      text: {
        "high-em": "#060D00",
        "med-em": "#4D4F4C",
        "low-em": "#969894",
        disabled: "#C9CBC8",
      },
      surface: {
        25: "#F8F8F7",
        50: "#F3F4F2",
        75: "#ECEDEB",
      },
      white: "#FFFFFF",
      black: "#060D00",
    },
    extend: {
      opacity: {
        8: "0.08",
      },
      height: {
        "nav-height": "72px",
      },
      inset: {
        "nav-height": "72px",
      },
    },
  },
  plugins: [],
};
