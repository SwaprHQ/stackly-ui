const ui = require("@stackly/ui/tailwind");

module.exports = {
  presets: [ui],
  content: ui.content.concat([
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ]),
};
