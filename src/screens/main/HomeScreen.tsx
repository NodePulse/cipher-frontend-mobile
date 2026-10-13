import React from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../theme';
import { I18nKeys, useLanguage } from '../../i18n';
import type { ThemeMode } from '../../theme/types';
import type { LanguageCode } from '../../i18n/types';
import { AppRoutes } from '../../navigation/routes';
import type { AppScreenProps } from '../../navigation/types';

export const HomeScreen: React.FC<
  Partial<AppScreenProps<typeof AppRoutes.CHAT>>
> = () => {
  const insets = useSafeAreaInsets();
  const { user, logout, isLoading } = useAuth();
  const { theme, mode, isDark, setThemeMode } = useTheme();
  const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage();

  const themeOptions: { label: string; mode: ThemeMode; icon: string }[] = [
    { label: 'Light', mode: 'light', icon: '☀️' },
    { label: 'Dark', mode: 'dark', icon: '🌙' },
    { label: 'System', mode: 'system', icon: '⚙️' },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                borderColor: theme.success,
              },
            ]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: theme.success }]}
            />
            <Text style={[styles.statusText, { color: theme.success }]}>
              {t(I18nKeys.HOME.AUTHENTICATED_BADGE)}
            </Text>
          </View>
          <Text style={[styles.appTitle, { color: theme.text }]}>
            {t(I18nKeys.HOME.APP_TITLE)}
          </Text>
        </View>

        {/* Language Selector Section */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              🌐 {t(I18nKeys.HOME.LANGUAGE_SECTION)}
            </Text>
          </View>

          <View style={styles.languageChipsRow}>
            {availableLanguages.map(lang => {
              const isSelected = currentLanguage === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageChip,
                    {
                      backgroundColor: isSelected
                        ? theme.brandBlue
                        : theme.backgroundSecondary,
                      borderColor: isSelected ? theme.brandBlue : theme.border,
                    },
                  ]}
                  onPress={() => setLanguage(lang.code as LanguageCode)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.flagText}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.languageText,
                      {
                        color: isSelected ? theme.white : theme.text,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {lang.nativeName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Theme Switcher Segmented Control */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              🎨 {t(I18nKeys.HOME.APPEARANCE_SECTION)}
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: theme.textSecondary }]}
            >
              {t(I18nKeys.HOME.CURRENTLY_LABEL)}: {isDark ? 'Dark' : 'Light'}
            </Text>
          </View>

          <View
            style={[
              styles.segmentedContainer,
              {
                backgroundColor: theme.backgroundSecondary,
                borderColor: theme.border,
              },
            ]}
          >
            {themeOptions.map(opt => {
              const isSelected = mode === opt.mode;
              return (
                <TouchableOpacity
                  key={opt.mode}
                  style={[
                    styles.segmentButton,
                    isSelected && [
                      styles.segmentButtonActive,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.brandBlue,
                      },
                    ],
                  ]}
                  onPress={() => setThemeMode(opt.mode)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.segmentIcon}>{opt.icon}</Text>
                  <Text
                    style={[
                      styles.segmentText,
                      {
                        color: isSelected
                          ? theme.brandBlue
                          : theme.textSecondary,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* User Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder,
            },
          ]}
        >
          <View
            style={[
              styles.avatarCircle,
              {
                backgroundColor: theme.brandBlueSoft,
                borderColor: theme.brandBlue,
              },
            ]}
          >
            <Text style={styles.avatarIcon}>👤</Text>
          </View>

          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.name ?? 'Operative'}
          </Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            {user?.email ?? 'agent@cipher.sec'}
          </Text>

          <View
            style={[styles.divider, { backgroundColor: theme.surfaceBorder }]}
          />

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
              {t(I18nKeys.HOME.SESSION_STATUS_LABEL)}
            </Text>
            <Text style={[styles.infoValue, { color: theme.brandBlue }]}>
              {t(I18nKeys.HOME.SESSION_STATUS_VALUE)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
              {t(I18nKeys.HOME.ENCRYPTION_LABEL)}
            </Text>
            <Text style={[styles.infoValue, { color: theme.brandBlue }]}>
              {t(I18nKeys.HOME.ENCRYPTION_VALUE)}
            </Text>
          </View>

          {user?.fingerprint && (
            <View
              style={[
                styles.fingerprintBox,
                {
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.surfaceBorder,
                },
              ]}
            >
              <Text
                style={[styles.fingerprintLabel, { color: theme.textMuted }]}
              >
                {t(I18nKeys.HOME.KEY_FINGERPRINT_LABEL)}
              </Text>
              <Text
                style={[
                  styles.fingerprintValue,
                  { color: theme.textSecondary },
                ]}
              >
                {user.fingerprint}
              </Text>
            </View>
          )}
        </View>

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: theme.danger },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={logout}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.white} />
            ) : (
              <Text style={styles.logoutButtonText}>
                {t(I18nKeys.HOME.SIGN_OUT_BTN)}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 12,
  },
  languageChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  flagText: {
    fontSize: 14,
    marginRight: 6,
  },
  languageText: {
    fontSize: 12,
  },
  segmentedContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    padding: 3,
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  segmentButtonActive: {
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  segmentText: {
    fontSize: 13,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarIcon: {
    fontSize: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    marginBottom: 12,
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  fingerprintBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginTop: 6,
  },
  fingerprintLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  fingerprintValue: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  actionContainer: {
    width: '100%',
    marginTop: 10,
  },
  logoutButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
