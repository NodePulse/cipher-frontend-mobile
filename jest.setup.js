require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-worklets', () => ({
  runOnUISync: fn => fn(),
  runOnJS: fn => fn,
  isWorkletFunction: () => false,
}));

jest.mock('react-native-reanimated', () => {
  const { View, Text, Image, ScrollView } = require('react-native');
  return {
    __esModule: true,
    default: {
      View,
      Text,
      Image,
      ScrollView,
      createAnimatedComponent: c => c,
    },
    View,
    Text,
    Image,
    ScrollView,
    createAnimatedComponent: c => c,
    useSharedValue: v => ({ value: v }),
    useAnimatedStyle: fn => fn(),
    withTiming: v => v,
    withSpring: v => v,
    withRepeat: v => v,
    withSequence: (...args) => args[0],
    interpolate: () => 0,
    FadeIn: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
  };
});
