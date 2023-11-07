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
      backgroundImage: (theme) => ({
        "gradient-purchase":
          "linear-gradient(90deg, #FFF7F4 0%, #FFF7F4 0.01%, #FFFFF9 50.52%, #FFFAFF 100%)",
        "gradient-best":
          "linear-gradient(90deg, #FBFBFF 0%, #F4FFFC 51.04%, #F9FCFF 100%)",
        "gradient-share":
          "linear-gradient(90deg, #FFFDFB 0%, #FFFBF4 50%, #FFFEF9 100%)",
        "gradient-find":
          "linear-gradient(90deg, #FFFBFE 0%, #F7FAFF 50%, #FCF9FF 100%)",
        "gradient-team":
          "linear-gradient(90deg, #FFFDFB 0%, #FFFCF8 0.01%, #F7FFFD 50%, #FFFDF9 100%)",
        "gradient-category":
          "linear-gradient(90deg, #FBFEFF 0%, #FFFCF8 0.01%, #FFF7F7 50%, #FFFDF9 100%)",
      }),
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4D58BE",

          secondary: "#212529",

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
