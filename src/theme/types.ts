export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeColors {
  // Brand
  brandBlue: string;
  brandBlueDark: string;
  brandBlueLight: string;
  brandBlueSoft: string;
  brandBlueMuted: string;

  // Primary aliases
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Backgrounds & Surfaces
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceLight: string;
  surfaceBorder: string;
  card: string;
  cardBackground: string;

  // Text
  text: string;
  textSecondary: string;
  textMuted: string;
  textLight: string;
  textTranslucent: string;

  // Borders & Dividers
  border: string;
  divider: string;

  // Status & Accents
  success: string;
  cyanDot: string;
  warning: string;
  danger: string;

  // Neutrals
  white: string;
  black: string;
  transparent: string;

  // Status bar
  statusBarStyle: 'dark-content' | 'light-content';
  isDark: boolean;
}

export interface ThemeContextType {
  theme: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}
