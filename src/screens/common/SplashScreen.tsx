import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { I18nKeys, useLanguage } from '../../i18n';
import { AuthRoutes } from '../../navigation/routes';
import type { AuthScreenProps } from '../../navigation/types';
import { ArrowRight } from 'lucide-react-native';

export const SplashScreen: React.FC<
  Partial<AuthScreenProps<typeof AuthRoutes.SPLASH>>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Smooth glowing pulse animation for encrypted node indicator
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const handleUnlock = () => {
    if (navigation) {
      navigation.navigate(AuthRoutes.ONBOARDING);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Main Gradient-like Vibrant Card */}
      <View
        style={[
          styles.card,
          {
            paddingTop: insets.top + 32,
            paddingBottom: insets.bottom + 24,
            backgroundColor: theme.brandBlue,
          },
        ]}
      >
        {/* Top Branding Section */}
        <View style={styles.topSection}>
          {/* Lock Squircle Icon */}
          <View style={styles.iconSquircle}>
            <View style={styles.lockIconContainer}>
              <Text style={styles.lockIcon}>🔒</Text>
              <View
                style={[
                  styles.userBadge,
                  { backgroundColor: theme.brandBlueDark },
                ]}
              >
                <Text style={styles.userBadgeText}>👤</Text>
              </View>
            </View>
          </View>

          <Text style={styles.appName}>{t(I18nKeys.SPLASH.APP_NAME)}</Text>
          <Text style={styles.appTagline}>{t(I18nKeys.SPLASH.TAGLINE)}</Text>
        </View>

        {/* Center Space */}
        <View style={styles.spacer} />

        {/* Bottom Actions Section */}
        <View style={styles.bottomSection}>
          {/* Status Capsule Badge */}
          <View style={styles.nodeBadge}>
            <Animated.View
              style={[
                styles.cyanDot,
                {
                  backgroundColor: theme.cyanDot,
                  opacity: pulseAnim,
                  transform: [
                    {
                      scale: pulseAnim.interpolate({
                        inputRange: [0.35, 1],
                        outputRange: [0.85, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Text style={styles.nodeBadgeText}>
              {t(I18nKeys.SPLASH.ENCRYPTED_NODE)}
            </Text>
          </View>

          {/* Unlock Vault Button */}
          <TouchableOpacity
            style={styles.unlockButton}
            onPress={handleUnlock}
            activeOpacity={0.88}
          >
            <Text
              style={[
                styles.unlockButtonText,
                { color: theme.brandBlue },
              ]}
            >
              {t(I18nKeys.SPLASH.UNLOCK_VAULT)}
            </Text>
            <ArrowRight size={20} color={theme.brandBlue} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#2E30E0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconSquircle: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  lockIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 40,
  },
  userBadge: {
    position: 'absolute',
    right: -8,
    bottom: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBadgeText: {
    fontSize: 11,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  nodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 20,
  },
  cyanDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 8,
  },
  nodeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  unlockButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    gap: 8,
  },
  unlockButtonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
