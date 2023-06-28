import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: {
      "50": "#d1c9fe",
      "100": "#b2a5fa",
      "200": "#9584f4",
      "300": "#7965eb",
      "400": "#5a42e7",
      "500": "#4d34dd",
      "600": "#442ccd",
      "700": "#422eb3",
      "800": "#3f2f9a",
      "900": "#3c2f83",
    },
    secondary: {
      700: "#383B51",
    },
    thirdy: {
      700: "#080F2D",
    },

    gray: {
      900: "#404040",
      800: "#595959",
      700: "#717171",
      600: "#9C9C9C",
      500: "#B2B2B2",
      400: "#CCCCCC",
      300: "#DEDEDE",
      200: "#EDEDED",
      100: "#F6F6F6",
      50: "#FAFAFA",
    },
    white: "#FFFFFF",
  },
  fonts: {
    heading: "Montserrat_700Bold",
    medium: "Montserrat_500Medium",
    body: "Montserrat_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
