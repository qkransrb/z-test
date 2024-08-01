/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff7a1b",
        customBlue: "rgb(104, 160, 255)",
        kaikas: "rgb(111, 101, 88)",
        metamask: "rgb(250, 251, 252)",
        klip: "rgb(254, 229, 0)",
      },
      backgroundImage: {
        zynoro: "url(/src/assets/images/background.jpg)",
        quantfi: "url(/src/assets/images/bg-quantfi.png)",
        dashboard: "url(/src/assets/images/bg-dashboard.png)",
        slider: "url(/src/assets/images/bg_slider.jpg)",
      },
    },
  },
  plugins: [],
};
