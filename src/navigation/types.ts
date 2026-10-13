import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { AuthRoutes, AppRoutes } from './routes';

export type AuthStackParamList = {
  [AuthRoutes.SPLASH]: undefined;
  [AuthRoutes.ONBOARDING]: undefined;
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.REGISTER]: undefined;
};

export type AppBottomTabParamList = {
  [AppRoutes.CHAT]: undefined;
  [AppRoutes.CALLS]: undefined;
  [AppRoutes.CANVAS]: undefined;
  [AppRoutes.CONTACTS]: undefined;
  [AppRoutes.SETTING]: undefined;
};

export type AppStackParamList = {
  [AppRoutes.MAIN_TABS]:
    | NavigatorScreenParams<AppBottomTabParamList>
    | undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type AppScreenProps<T extends keyof AppBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppBottomTabParamList, T>,
    StackScreenProps<AppStackParamList>
  >;
