import type { ThemeColors } from './types';

export const lightTheme: ThemeColors = {
  // Brand
  brandBlue: '#2E30E0',
  brandBlueDark: '#2325B5',
  brandBlueLight: '#4B4DF0',
  brandBlueSoft: '#F0F2FE',
  brandBlueMuted: '#E2E6FD',

  // Primary aliases
  primary: '#2E30E0',
  primaryDark: '#2325B5',
  primaryLight: '#4B4DF0',

  // Backgrounds & Surfaces
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FD',
  surface: '#FFFFFF',
  surfaceLight: '#F3F4F6',
  surfaceBorder: '#E5E7EB',
  card: '#FFFFFF',
  cardBackground: '#F0F2FE',

  // Text
  text: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  textLight: '#FFFFFF',
  textTranslucent: 'rgba(255, 255, 255, 0.75)',

  // Borders & Dividers
  border: '#E5E7EB',
  divider: '#F3F4F6',

  // Status & Accents
  success: '#10B981',
  cyanDot: '#22D3EE',
  warning: '#F59E0B',
  danger: '#EF4444',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Status bar
  statusBarStyle: 'dark-content',
  isDark: false,
};

export const darkTheme: ThemeColors = {
  // Brand
  brandBlue: '#2E30E0',
  brandBlueDark: '#2325B5',
  brandBlueLight: '#4B4DF0',
  brandBlueSoft: '#181B34',
  brandBlueMuted: '#222649',

  // Primary aliases
  primary: '#2E30E0',
  primaryDark: '#2325B5',
  primaryLight: '#4B4DF0',

  // Backgrounds & Surfaces
  background: '#0B0F19',
  backgroundSecondary: '#111827',
  surface: '#111827',
  surfaceLight: '#1F2937',
  surfaceBorder: '#374151',
  card: '#131A2A',
  cardBackground: '#171B31',

  // Text
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textLight: '#FFFFFF',
  textTranslucent: 'rgba(255, 255, 255, 0.75)',

  // Borders & Dividers
  border: '#374151',
  divider: '#1F2937',

  // Status & Accents
  success: '#10B981',
  cyanDot: '#22D3EE',
  warning: '#F59E0B',
  danger: '#EF4444',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Status bar
  statusBarStyle: 'light-content',
  isDark: true,
};

// Default colors export for backward compatibility
export const colors = lightTheme;
