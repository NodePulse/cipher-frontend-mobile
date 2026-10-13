import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/theme';
import { LanguageProvider } from './src/i18n';
import { AuthProvider } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation';

function AppContent() {
  const { theme, isDark } = useTheme();

  const navTheme = useMemo(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      dark: isDark,
      colors: {
        ...baseTheme.colors,
        background: theme.background,
        card: theme.surface,
        text: theme.text,
        border: theme.border,
        primary: theme.primary,
        notification: theme.danger,
      },
    };
  }, [theme, isDark]);

  return (
    <>
      <StatusBar barStyle={theme.statusBarStyle} />
      <NavigationContainer theme={navTheme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;
