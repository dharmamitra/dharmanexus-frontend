import { Noto_Serif, Source_Sans_3 } from "next/font/google";
// eslint-disable-next-line no-restricted-imports
import type { CssVarsThemeOptions } from "@mui/material/styles/experimental_extendTheme";
import { merge } from "lodash";
import { getDeployment } from "utils";
import { SourceLanguage } from "utils/constants";

import { getBaseDesignTokens } from "./themes/base";
import { getDharmamitraDesignTokens } from "./themes/dharmamitra";
import { getKumarajivaDesignTokens } from "./themes/kumarajiva";

export const sourceSerif = Noto_Serif({ subsets: ["latin", "latin-ext"] });
export const sourceSans = Source_Sans_3({ subsets: ["latin", "latin-ext"] });

declare module "@mui/material/styles" {
  interface TypeBackground {
    header: string;
    accent: string;
    card: string;
    inverted: string;
  }
  interface TypeText {
    inverted: string;
  }
}

export interface DesignTokenParams {
  // some theme elements depend on the source language selected
  sourceLanguage: SourceLanguage;
}

const deployment = getDeployment();
const getDeploytmentCustomTheming =
  deployment === "dharmamitra"
    ? getDharmamitraDesignTokens
    : getKumarajivaDesignTokens;

export const getDesignTokens = ({
  sourceLanguage,
}: DesignTokenParams): CssVarsThemeOptions => {
  const baseTheme = getBaseDesignTokens({ sourceLanguage });
  const deploymentTheme = getDeploytmentCustomTheming({ sourceLanguage });
  return merge(baseTheme, deploymentTheme);
};

export type ThemeType = ReturnType<typeof getDesignTokens>;
