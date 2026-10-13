import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppRoutes } from './routes';
import type { AppBottomTabParamList } from './types';
import { HomeScreen } from '../screens/main/HomeScreen';
import AppBottomTabBar from '../components/AppBottomTabBar';
import CallsScreen from '../screens/main/CallsScreen';
import CanvasScreen from '../screens/main/CanvasScreen';
import ContactsScreen from '../screens/main/ContactsScreen';
import SettingScreen from '../screens/main/SettingScreen';

const BottomTab = createBottomTabNavigator<AppBottomTabParamList>();

export const AppBottomTab: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={AppRoutes.CHAT}
      tabBar={props => <AppBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name={AppRoutes.CHAT}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.CALLS}
        component={CallsScreen}
        options={{
          tabBarLabel: 'Calls',
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.CANVAS}
        component={CanvasScreen}
        options={{
          tabBarLabel: 'Canvas',
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.CONTACTS}
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Contacts',
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.SETTING}
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
        }}
      />
    </BottomTab.Navigator>
  );
};
