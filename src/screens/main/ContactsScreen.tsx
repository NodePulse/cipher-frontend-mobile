import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
import { MessageSquare, Phone, Search, X } from 'lucide-react-native';
import { checkPermission, requestPermission } from '../../utils/permissions';
import PermissionModal from '../../components/PermissionModal';
import Input from '../../components/Input';
import { useTheme } from '../../theme';

const AVATAR_COLORS = [
  '#2E30E0',
  '#7C3AED',
  '#059669',
  '#D97706',
  '#DC2626',
  '#0284C7',
  '#DB2777',
  '#4F46E5',
  '#0D9488',
];

const getInitials = (
  givenName?: string | null,
  familyName?: string | null,
  displayName?: string | null,
) => {
  const first = (givenName || '').trim().charAt(0).toUpperCase();
  const last = (familyName || '').trim().charAt(0).toUpperCase();
  if (first && last) {
    return `${first}${last}`;
  }
  if (first) {
    return first;
  }
  if (displayName) {
    const parts = displayName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return displayName.charAt(0).toUpperCase();
  }
  return '?';
};

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[Math.abs(hash)];
};

interface ContactItemProps {
  contact: Contact;
  onPressMessage?: (contact: Contact) => void;
  onPressCall?: (contact: Contact) => void;
}

const ContactItem = React.memo<ContactItemProps>(
  ({ contact, onPressMessage, onPressCall }) => {
    const { theme, isDark } = useTheme();

    const fullName = useMemo(() => {
      const name = `${contact.givenName || ''} ${
        contact.familyName || ''
      }`.trim();
      return (
        name || contact.displayName || contact.company || 'Unknown Contact'
      );
    }, [contact]);

    const initials = useMemo(
      () =>
        getInitials(contact.givenName, contact.familyName, contact.displayName),
      [contact],
    );

    const avatarBg = useMemo(() => getAvatarColor(fullName), [fullName]);
    const phoneNumber = contact.phoneNumbers?.[0]?.number;
    const phoneLabel = contact.phoneNumbers?.[0]?.label;

    return (
      <TouchableOpacity
        style={styles.contactCard}
        activeOpacity={0.7}
        onPress={() => onPressMessage?.(contact)}
      >
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          {contact.hasThumbnail && contact.thumbnailPath ? (
            <Image
              source={{ uri: contact.thumbnailPath }}
              style={styles.avatarImage}
            />
          ) : (
            <View
              style={[styles.avatarFallback, { backgroundColor: avatarBg }]}
            >
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.contactDetails}>
          <Text
            style={[styles.contactName, { color: theme.text }]}
            numberOfLines={1}
          >
            {fullName}
          </Text>

          <View style={styles.phoneRow}>
            {phoneNumber ? (
              <Text
                style={[styles.contactPhone, { color: theme.textSecondary }]}
                numberOfLines={1}
              >
                {phoneLabel ? `${phoneLabel}: ` : ''}
                {phoneNumber}
              </Text>
            ) : (
              <Text
                style={[styles.contactPhone, { color: theme.textMuted }]}
                numberOfLines={1}
              >
                No phone number
              </Text>
            )}
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionsRow}>
          {phoneNumber ? (
            <TouchableOpacity
              style={[
                styles.actionButton,
                isDark ? styles.callButtonDark : styles.callButtonLight,
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onPress={() => onPressCall?.(contact)}
            >
              <Phone size={16} color={theme.success} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={[
              styles.actionButton,
              isDark ? styles.messageButtonDark : styles.messageButtonLight,
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={() => onPressMessage?.(contact)}
          >
            <MessageSquare size={16} color={theme.brandBlue} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  },
);

ContactItem.displayName = 'ContactItem';

const ContactSeparator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.separator,
        { backgroundColor: theme.surfaceBorder },
      ]}
    />
  );
};

export default function ContactsScreen() {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    setLoading(true);
    try {
      let permResult = await checkPermission(
        PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.IOS.CONTACTS,
      );

      // Directly trigger native OS permission dialog (no custom modal)
      if (!permResult.granted) {
        permResult = await requestPermission(
          PERMISSIONS.ANDROID.READ_CONTACTS,
          PERMISSIONS.IOS.CONTACTS,
        );
      }

      if (!permResult.granted) {
        setLoading(false);
        if (permResult.status === RESULTS.BLOCKED) {
          setShowPermissionModal(true);
        }
        return;
      }

      const allContacts = await Contacts.getAll();
      const sorted = allContacts.sort((a, b) => {
        const nameA = (a.givenName || a.displayName || '').toLowerCase();
        const nameB = (b.givenName || b.displayName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setContacts(sorted);
    } catch {
      // Ignore error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    if (!search.trim()) {
      return contacts;
    }
    const query = search.toLowerCase();
    return contacts.filter(contact => {
      const fullName = `${contact.givenName || ''} ${
        contact.familyName || ''
      }`.toLowerCase();
      const displayName = (contact.displayName || '').toLowerCase();
      const phone = contact.phoneNumbers?.[0]?.number || '';
      return (
        fullName.includes(query) ||
        displayName.includes(query) ||
        phone.includes(query)
      );
    });
  }, [contacts, search]);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* Search Input */}
      <Input
        value={search}
        onChangeText={setSearch}
        placeholder="Search contacts..."
        leftIcon={<Search size={18} color={theme.textMuted} />}
        rightIcon={
          search.length > 0 ? (
            <X size={16} color={theme.textMuted} />
          ) : undefined
        }
        onPressRightIcon={() => setSearch('')}
        containerStyle={styles.searchContainer}
      />

      {/* Header Info */}
      <View style={styles.countRow}>
        <Text style={[styles.countText, { color: theme.textMuted }]}>
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contact' : 'contacts'}
        </Text>
      </View>

      {/* Contacts List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.brandBlue} />
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) => <ContactItem contact={item} />}
          keyExtractor={item => item.recordID}
          ItemSeparatorComponent={ContactSeparator}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.textMuted }]}>
                {search ? 'No contacts found' : 'No contacts available'}
              </Text>
              {!search ? (
                <TouchableOpacity
                  style={[
                    styles.syncButton,
                    { backgroundColor: theme.brandBlueSoft },
                  ]}
                  onPress={loadContacts}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[styles.syncButtonText, { color: theme.brandBlue }]}
                  >
                    Sync Contacts
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          }
        />
      )}

      {/* Permission Request Modal (Only shown if blocked to guide to Settings) */}
      <PermissionModal
        visible={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onPermissionGranted={() => {
          setShowPermissionModal(false);
          loadContacts();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchContainer: {
    marginBottom: 8,
  },
  countRow: {
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  listContent: {
    paddingBottom: 24,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  avatarWrapper: {
    marginRight: 14,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  contactDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactPhone: {
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonLight: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  callButtonDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  messageButtonLight: {
    backgroundColor: '#F0F2FE',
  },
  messageButtonDark: {
    backgroundColor: '#222649',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 62,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  syncButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  syncButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
