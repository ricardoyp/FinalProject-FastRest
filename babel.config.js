module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          // Reemplaza con la ruta a tu tamagui.config.ts si tienes uno
          config: "./tamagui.config.ts",
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === "development",
        },
      ],
      // NOTA: esto solo es necesario si estás usando reanimated para animaciones
      "react-native-reanimated/plugin",
    ],
  };
};
