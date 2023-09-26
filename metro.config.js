const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);

config.transformer.getTransformOption = async () => {
  return {
    ...config,
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: config.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...config.sourceExts, "svg"],
    },
  };
};

module.exports = config;
