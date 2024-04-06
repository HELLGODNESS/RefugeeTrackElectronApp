
module.exports = {
  content: ["./index.html",
    "./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  // theme: {
  //   extend: {
  //     colors: {
  //       primary: "#e9b15c",
  //       secondary: "#db5c1c",
  //       peach: "#ffa064",
  //       skin: "#ffe0c7",
  //       darkGray: "#494949",
  //     },
  //   },
  // },
  plugins: [require('@tailwindcss/forms')],
};
