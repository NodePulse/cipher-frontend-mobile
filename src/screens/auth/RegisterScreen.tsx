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

export const RegisterScreen: React.FC<
  AuthScreenProps<typeof AuthRoutes.REGISTER>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { register, isLoading } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name.trim()) {
      setError(t(I18nKeys.AUTH.HANDLE_PLACEHOLDER));
      return;
    }
    if (!email.trim()) {
      setError(t(I18nKeys.AUTH.EMAIL_ADDRESS_LABEL));
      return;
    }
    if (password.length < 6) {
      setError('Passphrase must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passphrases do not match');
      return;
    }

    setError(null);
    try {
      await register(name.trim(), email.trim(), password);
    } catch {
      setError('Registration failed. Please try again.');
    }
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
            <Text style={styles.headerIcon}>🔑</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            {t(I18nKeys.AUTH.REGISTER_TITLE)}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t(I18nKeys.AUTH.REGISTER_SUBTITLE)}
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
              {t(I18nKeys.AUTH.HANDLE_LABEL)}
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
              placeholder={t(I18nKeys.AUTH.HANDLE_PLACEHOLDER)}
              placeholderTextColor={theme.textMuted}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t(I18nKeys.AUTH.EMAIL_ADDRESS_LABEL)}
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
              placeholder="alex@cipher.sec"
              placeholderTextColor={theme.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t(I18nKeys.AUTH.MASTER_PASSPHRASE_LABEL)}
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
              placeholder="Min. 6 characters"
              placeholderTextColor={theme.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {t(I18nKeys.AUTH.CONFIRM_PASSPHRASE_LABEL)}
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
              placeholder="Re-enter passphrase"
              placeholderTextColor={theme.textMuted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View
            style={[
              styles.badgeNotice,
              {
                backgroundColor: theme.brandBlueSoft,
                borderColor: theme.brandBlueMuted,
              },
            ]}
          >
            <Text style={styles.badgeIcon}>🔒</Text>
            <Text style={[styles.badgeText, { color: theme.brandBlue }]}>
              {t(I18nKeys.AUTH.ZERO_KNOWLEDGE_NOTICE)}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: theme.brandBlue },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.white} />
            ) : (
              <Text style={styles.primaryButtonText}>
                {t(I18nKeys.AUTH.GENERATE_KEYS_BTN)}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            {t(I18nKeys.AUTH.ALREADY_REGISTERED_PROMPT)}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthRoutes.LOGIN)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.loginLink, { color: theme.brandBlue }]}>
              {t(I18nKeys.AUTH.SIGN_IN_LINK)}
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
    marginBottom: 28,
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
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 18,
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
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
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
    paddingVertical: 13,
    fontSize: 15,
  },
  badgeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  badgeIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  badgeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 13,
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
  },
});
