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
import {
  Contact,
  Edit,
  MessageSquareText,
  Phone,
  Settings,
  User,
} from 'lucide-react-native';
import { I18nKeys, useTranslation } from '../i18n';
import { TouchableOpacity } from 'react-native';

const BottomTab = createBottomTabNavigator<AppBottomTabParamList>();

export const AppBottomTab: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BottomTab.Navigator
      initialRouteName={AppRoutes.CHAT}
      tabBar={props => <AppBottomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 16,
              backgroundColor: 'blue',
              padding: 8,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={20} color={'white'} />
          </TouchableOpacity>
        ),
      }}
    >
      <BottomTab.Screen
        name={AppRoutes.CHAT}
        component={HomeScreen}
        options={{
          tabBarLabel: t(I18nKeys.TAB.CHAT),
          tabBarIcon: ({ color, size, focused }) => (
            <MessageSquareText
              size={size}
              color={color}
              strokeWidth={focused ? 2.5 : 1.8}
            />
          ),
          headerTitle: t(I18nKeys.TAB.CHAT),
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.CALLS}
        component={CallsScreen}
        options={{
          tabBarLabel: t(I18nKeys.TAB.CALLS),
          tabBarIcon: ({ color, size, focused }) => (
            <Phone
              size={size}
              color={color}
              strokeWidth={focused ? 2.5 : 1.8}
            />
          ),
          headerTitle: t(I18nKeys.TAB.CALLS),
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.CANVAS}
        component={CanvasScreen}
        options={{
          tabBarLabel: t(I18nKeys.TAB.CANVAS),
          tabBarIcon: ({ color, size, focused }) => (
            <Edit size={size} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
          headerTitle: t(I18nKeys.TAB.CANVAS),
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.CONTACTS}
        component={ContactsScreen}
        options={{
          tabBarLabel: t(I18nKeys.TAB.CONTACTS),
          tabBarIcon: ({ color, size, focused }) => (
            <Contact
              size={size}
              color={color}
              strokeWidth={focused ? 2.5 : 1.8}
            />
          ),
          headerTitle: t(I18nKeys.TAB.CONTACTS),
        }}
      />
      <BottomTab.Screen
        name={AppRoutes.SETTING}
        component={SettingScreen}
        options={{
          tabBarLabel: t(I18nKeys.TAB.SETTINGS),
          tabBarIcon: ({ color, size, focused }) => (
            <Settings
              size={size}
              color={color}
              strokeWidth={focused ? 2.5 : 1.8}
            />
          ),
          headerTitle: t(I18nKeys.TAB.SETTINGS),
        }}
      />
    </BottomTab.Navigator>
  );
};
