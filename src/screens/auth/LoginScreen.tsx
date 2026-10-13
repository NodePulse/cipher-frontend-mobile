import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../theme';
import { I18nKeys, useLanguage } from '../../i18n';
import { AuthRoutes } from '../../navigation/routes';
import type { AuthScreenProps } from '../../navigation/types';

export const LoginScreen: React.FC<AuthScreenProps<typeof AuthRoutes.LOGIN>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim()) {
      setError(t(I18nKeys.AUTH.EMAIL_PLACEHOLDER));
      return;
    }
    setError(null);
    try {
      await login(email.trim(), password);
    } catch {
      setError('Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickDemo = async () => {
    setError(null);
    await login('operative@cipher.sec', 'demo1234');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardView, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: theme.brandBlueSoft,
                borderColor: theme.brandBlueMuted,
              },
            ]}
          >
            <Text style={styles.headerIcon}>🛡️</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            {t(I18nKeys.AUTH.LOGIN_TITLE)}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t(I18nKeys.AUTH.LOGIN_SUBTITLE)}
          </Text>
        </View>

        {error ? (
          <View
            style={[
              styles.errorBox,
              { borderColor: theme.danger },
            ]}
          >
            <Text style={[styles.errorText, { color: theme.danger }]}>
              {error}
            </Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t(I18nKeys.AUTH.EMAIL_LABEL)}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surfaceLight,
                  borderColor: theme.surfaceBorder,
                  color: theme.text,
                },
              ]}
              placeholder={t(I18nKeys.AUTH.EMAIL_PLACEHOLDER)}
              placeholderTextColor={theme.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.passwordRow}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                {t(I18nKeys.AUTH.PASSPHRASE_LABEL)}
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surfaceLight,
                  borderColor: theme.surfaceBorder,
                  color: theme.text,
                },
              ]}
              placeholder={t(I18nKeys.AUTH.PASSPHRASE_PLACEHOLDER)}
              placeholderTextColor={theme.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: theme.brandBlue },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.white} />
            ) : (
              <Text style={styles.primaryButtonText}>
                {t(I18nKeys.AUTH.SIGN_IN_BTN)}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              {
                backgroundColor: theme.brandBlueSoft,
                borderColor: theme.brandBlueMuted,
              },
            ]}
            onPress={handleQuickDemo}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.secondaryButtonText, { color: theme.brandBlue }]}
            >
              {t(I18nKeys.AUTH.QUICK_DEMO_BTN)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            {t(I18nKeys.AUTH.NO_IDENTITY_PROMPT)}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthRoutes.REGISTER)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.signUpLink, { color: theme.brandBlue }]}>
              {t(I18nKeys.AUTH.CREATE_IDENTITY_LINK)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 12,
    shadowColor: '#2E30E0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 13,
  },
  signUpLink: {
    fontSize: 13,
    fontWeight: '700',
  },
});
