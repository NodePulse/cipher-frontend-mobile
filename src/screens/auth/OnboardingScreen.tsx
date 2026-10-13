import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { I18nKeys, useLanguage } from '../../i18n';
import { AuthRoutes } from '../../navigation/routes';
import type { AuthScreenProps } from '../../navigation/types';
import { ArrowRight, Globe, Lock, ShieldCheck } from 'lucide-react-native';

const privacyImg = require('../../assets/images/privacy.jpg');
const securityImg = require('../../assets/images/security.jpg');
const networkImg = require('../../assets/images/network.jpg');

interface SlideData {
  id: string;
  image: any;
  badgeLabel: string;
  badgeIcon: React.ReactNode;
  headline: string;
  description: string;
}

export const OnboardingScreen: React.FC<
  AuthScreenProps<typeof AuthRoutes.ONBOARDING>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const cardWidth = width - 40; // 20 horizontal padding on each side

  const slides: SlideData[] = useMemo(
    () => [
      {
        id: '1',
        image: privacyImg,
        badgeLabel: t(I18nKeys.ONBOARDING.SLIDE_1_BADGE),
        badgeIcon: <ShieldCheck size={16} color={theme.brandBlue} />,
        headline: t(I18nKeys.ONBOARDING.SLIDE_1_HEADLINE),
        description: t(I18nKeys.ONBOARDING.SLIDE_1_DESC),
      },
      {
        id: '2',
        image: securityImg,
        badgeLabel: t(I18nKeys.ONBOARDING.SLIDE_2_BADGE),
        badgeIcon: <Lock size={16} color={theme.brandBlue} />,
        headline: t(I18nKeys.ONBOARDING.SLIDE_2_HEADLINE),
        description: t(I18nKeys.ONBOARDING.SLIDE_2_DESC),
      },
      {
        id: '3',
        image: networkImg,
        badgeLabel: t(I18nKeys.ONBOARDING.SLIDE_3_BADGE),
        badgeIcon: <Globe size={16} color={theme.brandBlue} />,
        headline: t(I18nKeys.ONBOARDING.SLIDE_3_HEADLINE),
        description: t(I18nKeys.ONBOARDING.SLIDE_3_DESC),
      },
    ],
    [t, theme.brandBlue],
  );

  const currentSlide = slides[currentIndex] || slides[0];
  const isLastSlide = currentIndex === slides.length - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / cardWidth);
    if (index >= 0 && index < slides.length && index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      navigation.navigate(AuthRoutes.REGISTER);
    } else {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    navigation.navigate(AuthRoutes.LOGIN);
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      {/* Top Header Row with Skip Button */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <Text style={[styles.brandLogoText, { color: theme.brandBlue }]}>
            🔐 CIPHER
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSkip}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          activeOpacity={0.7}
        >
          <Text style={[styles.skipText, { color: theme.textSecondary }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Swipeable Carousel / Image Stage */}
      <View style={styles.stageContainer}>
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleScroll}
          decelerationRate="fast"
          snapToInterval={cardWidth}
          snapToAlignment="center"
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  width: cardWidth,
                  backgroundColor: isDark ? '#14182E' : '#F0F2FE',
                  borderColor: isDark ? '#252B4D' : '#E0E4FB',
                },
              ]}
            >
              <Image
                source={item.image}
                style={styles.illustrationImage}
                resizeMode="cover"
              />
              <View
                style={[
                  styles.badgeContainer,
                  {
                    backgroundColor: isDark
                      ? 'rgba(11, 15, 25, 0.85)'
                      : 'rgba(255, 255, 255, 0.92)',
                    borderColor: isDark
                      ? 'rgba(75, 77, 240, 0.35)'
                      : 'rgba(46, 48, 224, 0.15)',
                  },
                ]}
              >
                {item.badgeIcon}
                <Text
                  style={[
                    styles.badgeText,
                    { color: isDark ? '#F9FAFB' : '#1F2937' },
                  ]}
                >
                  {item.badgeLabel}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Pagination Indicators */}
      <View style={styles.paginationRow}>
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              activeOpacity={0.8}
              style={[
                styles.dot,
                isActive
                  ? [styles.dotActive, { backgroundColor: theme.brandBlue }]
                  : [styles.dotInactive, { backgroundColor: theme.border }],
              ]}
            />
          );
        })}
      </View>

      {/* Text Info Section */}
      <View style={styles.textSection}>
        <Text style={[styles.headline, { color: theme.text }]}>
          {currentSlide.headline}
        </Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {currentSlide.description}
        </Text>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.brandBlue }]}
          onPress={handleNext}
          activeOpacity={0.88}
        >
          <Text style={styles.primaryButtonText}>
            {isLastSlide ? t(I18nKeys.ONBOARDING.GET_STARTED) : 'Continue'}
          </Text>
          <ArrowRight size={18} color="#FFFFFF" style={styles.buttonArrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryLink}
          onPress={() => navigation.navigate(AuthRoutes.LOGIN)}
          activeOpacity={0.7}
        >
          <Text style={[styles.secondaryLinkText, { color: theme.brandBlue }]}>
            {t(I18nKeys.ONBOARDING.ALREADY_HAVE_ACCOUNT)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogoText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stageContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  listContent: {
    alignItems: 'center',
  },
  card: {
    height: 480,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
    shadowColor: '#2E30E0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    gap: 6,
  },
  badgeText: {
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  dotInactive: {
    width: 6,
  },
  dotActive: {
    width: 24,
  },
  textSection: {
    paddingHorizontal: 8,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 27,
  },
  description: {
    fontSize: 13.5,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  buttonSection: {
    width: '100%',
    marginTop: 6,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E30E0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  buttonArrow: {
    marginLeft: 2,
  },
  secondaryLink: {
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
