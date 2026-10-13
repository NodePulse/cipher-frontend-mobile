import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes } from './routes';
import type { AppStackParamList } from './types';
import { AppBottomTab } from './AppBottomTab';
import { useTheme } from '../theme';

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={AppRoutes.MAIN_TABS}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name={AppRoutes.MAIN_TABS} component={AppBottomTab} />
    </Stack.Navigator>
  );
};
