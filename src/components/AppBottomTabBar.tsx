import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Contact,
  MessageSquareText,
  Phone,
  Signature,
} from 'lucide-react-native';
import { useTheme } from '../theme';
import { AppRoutes } from '../navigation/routes';
import Settings from 'lucide-react-native/icons/settings';

export default function AppBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const renderIcon = (routeName: string, color: string, isFocused: boolean) => {
    switch (routeName) {
      case AppRoutes.CHAT:
        return (
          <MessageSquareText
            size={22}
            color={color}
            strokeWidth={isFocused ? 2.5 : 2}
          />
        );

      case AppRoutes.CALLS:
        return (
          <Phone size={22} color={color} strokeWidth={isFocused ? 2.5 : 2} />
        );

      case AppRoutes.CANVAS:
        return (
          <Signature
            size={22}
            color={color}
            strokeWidth={isFocused ? 2.5 : 2}
          />
        );

      case AppRoutes.CONTACTS:
        return (
          <Contact size={22} color={color} strokeWidth={isFocused ? 2.5 : 2} />
        );

      case AppRoutes.SETTING:
        return (
          <Settings size={22} color={color} strokeWidth={isFocused ? 2.5 : 2} />
        );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderTopColor: theme.surfaceBorder,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const color = isFocused ? theme.brandBlue : theme.textSecondary;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel.toString()
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {renderIcon(route.name, color, isFocused)}
            </View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color,
                  fontWeight: isFocused ? '600' : '400',
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconContainer: {
    marginBottom: 4,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
  },
});
