// tailwind.config.ts
import type { Config } from 'tailwindcss'; // <--- 引入 Config 型別

const config: Config = { // <--- 使用 Config 型別來定義你的配置物件
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iansui: ['Iansui', 'sans-serif'],
        phiaute: ['phiaute', 'sans-serif'],
        title: ['poj-garamond', 'sans-serif']
      }
    },
  },
  plugins: [],
}

export default config; // <--- 使用 export default