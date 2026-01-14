import { defineConfig, presetAttributify } from "unocss";
import presetWind4 from "@unocss/preset-wind4";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind4(), // 兼容 Tailwind CSS v4
    presetIcons({
      prefix: "i-",
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    colors: {
      primary: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6', // 主色
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
        950: '#2e1065',
      },
    },
  },
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "btn-hover": "transition-all duration-300 hover:scale-105 active:scale-95",
    "glass-card": "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl",
  },
});
