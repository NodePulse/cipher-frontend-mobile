import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoutes } from './routes';
import type { AuthStackParamList } from './types';
import { SplashScreen } from '../screens/common/SplashScreen';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { useTheme } from '../theme';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={AuthRoutes.SPLASH}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name={AuthRoutes.SPLASH} component={SplashScreen} />
      <Stack.Screen name={AuthRoutes.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={AuthRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AuthRoutes.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};
