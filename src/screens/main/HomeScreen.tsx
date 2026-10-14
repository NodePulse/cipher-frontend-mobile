import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme';
import { AppRoutes } from '../../navigation/routes';
import type { AppScreenProps } from '../../navigation/types';
import { Edit, Search, X } from 'lucide-react-native';
import { Input } from '../../components';

export const HomeScreen: React.FC<
  Partial<AppScreenProps<typeof AppRoutes.CHAT>>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingTop: 32,
          paddingBottom: 16,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.brandBlue }]}
        activeOpacity={0.85}
        onPress={() => navigation?.navigate?.(AppRoutes.CONTACTS)}
      >
        <Edit color={theme.white} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    // paddingBottom: 24,
  },
  searchContainer: {
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E30E0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
});
