const INDIGO = {
  primary: "#6d28d9",
  secondary: "#5b21b6",
  dark: "#1a1650",
  darker: "#0d0b2e",
  light: "#a78bfa",
  muted: "#3730a3",
  surface: "#201c5c",
  surfaceLight: "#312880",
};

const PINK = {
  primary: "#EC4899",
  light: "#F472B6",
  muted: "#BE185D",
  border: "#D946EF",
};

const NEUTRAL = {
  white: "#FFFFFF",
  offWhite: "#F0EBFF",
  gray100: "#ede9fe",
  gray200: "#ddd6fe",
  gray400: "#c4b5fd",
  gray600: "#7c3aed",
  dark: "#05040e",
};

export default {
  purple: INDIGO,
  pink: PINK,
  neutral: NEUTRAL,
  background: INDIGO.darker,
  surface: INDIGO.surface,
  surfaceLight: INDIGO.surfaceLight,
  text: NEUTRAL.white,
  textMuted: NEUTRAL.gray400,
  border: PINK.border,
  accent: PINK.primary,
  accentLight: PINK.light,
  tint: INDIGO.light,
  tabIconDefault: INDIGO.muted,
  tabIconSelected: PINK.primary,
};
