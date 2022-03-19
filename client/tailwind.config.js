module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: [
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        "San Francisco",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      mono: ["Roboto Mono", "monospace"],
      markdown: ["Merriweather"],
    },
  },
  plugins: [],
};
