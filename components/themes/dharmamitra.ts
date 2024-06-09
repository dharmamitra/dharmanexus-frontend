import { DesignTokenParams } from "@components/theme";
import { grey } from "@mui/material/colors";
// eslint-disable-next-line no-restricted-imports
import type { CssVarsThemeOptions } from "@mui/material/styles/experimental_extendTheme";

import {
  commonPaletteColors,
  SOURCE_LANG_COLORS,
  SOURCE_LANG_DARK_COLORS,
} from "./base";

const defaultPrimary = "#972e3a";
const defaultPrimaryBg = "#f2eeee";

export const getDharmamitraDesignTokens = ({
  sourceLanguage,
}: DesignTokenParams): CssVarsThemeOptions => ({
  colorSchemes: {
    light: {
      palette: {
        common: commonPaletteColors,
        primary: {
          main: sourceLanguage
            ? SOURCE_LANG_COLORS[sourceLanguage]
            : defaultPrimary,
        },
        background: {
          default: "#f7f7f7",
          paper: "#ffffff",
          accent: grey[50],
          header: sourceLanguage
            ? SOURCE_LANG_COLORS[sourceLanguage]
            : defaultPrimaryBg,
          card: grey[100],
          inverted: grey[800],
        },
        text: {
          primary: grey[900],
          secondary: grey[700],
          inverted: grey[50],
        },
        divider: "rgba(54,31,13,0.12)",
      },
    },
    dark: {
      // palette values for dark mode
      palette: {
        common: commonPaletteColors,
        primary: {
          main: sourceLanguage
            ? SOURCE_LANG_DARK_COLORS.accent[sourceLanguage]
            : "#E1BD97",
          contrastText: "#fff",
        },
        secondary: {
          main: "#C23211",
        },
        error: {
          main: "#972222",
        },
        warning: {
          main: "#FE8027",
        },
        info: {
          main: "#0DC0E8",
        },
        success: {
          main: "#10A60B",
        },
        background: {
          default: "#201c22",
          paper: defaultPrimary,
          accent: grey[900],
          header: sourceLanguage
            ? SOURCE_LANG_DARK_COLORS.main[sourceLanguage]
            : defaultPrimary,
          card: defaultPrimary,
        },
        text: {
          primary: grey[100],
          secondary: grey[300],
          inverted: grey[900],
        },
        divider: "rgba(54,31,13,0.12)",
      },
    },
  },
});
