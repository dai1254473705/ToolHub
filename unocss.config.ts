import { defineConfig, presetAttributify } from "unocss";
import presetWind4 from "@unocss/preset-wind4";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind4(),
    presetIcons({
      prefix: "i-", // 设置 icon 的默认前缀，默认就是 i-
    }),
  ],
  theme: {
    colors: {
      primary: "#1890ff",
      secondary: "#52c41a",
      warning: "#faad14",
      error: "#f5222d",
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
      ],
    },
  },
  shortcuts: {
    "btn-primary":
      "bg-primary hover:bg-primary/90 text-white font-medium rounded-md px-4 py-2 transition-all",
    "btn-secondary":
      "bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium rounded-md px-4 py-2 transition-all",
    card: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all",
    input:
      "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
  },
});
