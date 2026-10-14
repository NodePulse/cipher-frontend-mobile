import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  openSettings,
  RESULTS,
  type Permission,
} from 'react-native-permissions';
import {
  Bell,
  Camera,
  Image as ImageIcon,
  MapPin,
  Mic,
  Users,
} from 'lucide-react-native';
import {
  type AppPermissionType,
  PERMISSION_CONFIGS,
  requestAppPermission,
  requestPermission,
} from '../utils/permissions';
import { useTheme } from '../theme';

export type PermissionModalProps = {
  visible: boolean;
  onClose: () => void;
  onPermissionGranted: () => void;
  type?: AppPermissionType;
  title?: string;
  description?: string;
  blockedTitle?: string;
  blockedDescription?: string;
  customIcon?: React.ReactNode;
  androidPermission?: Permission;
  iosPermission?: Permission;
};

export default function PermissionModal({
  visible,
  onClose,
  onPermissionGranted,
  type = 'contacts',
  title,
  description,
  blockedTitle,
  blockedDescription,
  customIcon,
  androidPermission,
  iosPermission,
}: PermissionModalProps) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState('');

  const config = PERMISSION_CONFIGS[type] || PERMISSION_CONFIGS.contacts;

  const handleContinue = async () => {
    try {
      setLoading(true);
      setError('');

      let result;
      if (androidPermission && iosPermission) {
        result = await requestPermission(androidPermission, iosPermission);
      } else {
        result = await requestAppPermission(type);
      }

      if (result.granted) {
        onClose();
        onPermissionGranted();
        return;
      }

      if (result.status === RESULTS.BLOCKED) {
        setBlocked(true);
        return;
      }

      if (result.status === RESULTS.UNAVAILABLE) {
        setError(`${config.title} is unavailable on this device.`);
        return;
      }

      setError('Permission was not granted.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch {
      setError('Unable to open Settings. Please open it manually.');
    }
  };

  const renderIcon = () => {
    if (customIcon) {
      return customIcon;
    }

    const iconProps = {
      size: 32,
      color: theme.brandBlue,
      strokeWidth: 2,
    };

    switch (config.iconName) {
      case 'camera':
        return <Camera {...iconProps} />;
      case 'mic':
        return <Mic {...iconProps} />;
      case 'image':
        return <ImageIcon {...iconProps} />;
      case 'map-pin':
        return <MapPin {...iconProps} />;
      case 'bell':
        return <Bell {...iconProps} />;
      case 'users':
      default:
        return <Users {...iconProps} />;
    }
  };

  const displayTitle =
    (blocked ? blockedTitle : title) ||
    (blocked ? config.blockedTitle : config.title);

  const displayDescription =
    (blocked ? blockedDescription : description) ||
    (blocked ? config.blockedDescription : config.description);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
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
              styles.iconContainer,
              {
                backgroundColor:
                  theme.brandBlueSoft || 'rgba(59, 130, 246, 0.15)',
              },
            ]}
          >
            {renderIcon()}
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            {displayTitle}
          </Text>

          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {displayDescription}
          </Text>

          {!!error && (
            <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>
          )}

          <Pressable
            style={[
              styles.primaryButton,
              { backgroundColor: theme.brandBlue },
              loading && styles.disabledButton,
            ]}
            disabled={loading}
            onPress={blocked ? handleOpenSettings : handleContinue}
          >
            {loading ? (
              <ActivityIndicator color={theme.white} />
            ) : (
              <Text style={[styles.primaryText, { color: theme.white }]}>
                {blocked ? 'Open Settings' : 'Continue'}
              </Text>
            )}
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            disabled={loading}
            onPress={onClose}
          >
            <Text
              style={[styles.secondaryText, { color: theme.textSecondary }]}
            >
              Not now
            </Text>
          </Pressable>

          <Text style={[styles.privacy, { color: theme.textMuted }]}>
            Your privacy is protected. Cipher accesses features only with your
            permission.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  error: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 14,
  },
  primaryButton: {
    width: '100%',
    minHeight: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryText: {
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 12,
    marginTop: 4,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  privacy: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
});
