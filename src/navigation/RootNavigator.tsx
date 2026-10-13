import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { SplashScreen } from '../screens/common/SplashScreen';

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  // Show splash only during initial app launch while restoring session
  if (isInitializing) {
    return <SplashScreen />;
  }

  // Once initialized, switch directly between AppStack and AuthStack without flashing splash
  return isAuthenticated ? <AppStack /> : <AuthStack />;
};
