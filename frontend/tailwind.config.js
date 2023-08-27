/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        B: ["Pretendard-bold "],
        M: ["Pretendard-Medium "],
        R: ["Pretendard-Regular "],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4D58BE",

          secondary: "#f000b8",

          accent: "#1dcdbc",

          neutral: "#2b3440",

          "base-100": "#ffffff",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
