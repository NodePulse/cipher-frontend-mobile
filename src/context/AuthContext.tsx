import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  statusMessage?: string;
  fingerprint?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const mockDefaultUser: User = {
  id: 'usr_ciph_001',
  name: 'Cipher Operative',
  email: 'agent@cipher.sec',
  username: 'ciph_operative',
  statusMessage: 'Encrypted & Active',
  fingerprint: 'SHA256:7a9f:88b1:4e02:c29a:d8e3:19ff:a004:bc12',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Only runs on initial app boot to restore persisted session
    const checkAuthStatus = async () => {
      try {
        await new Promise<void>(resolve => setTimeout(() => resolve(), 600));
        setIsAuthenticated(false);
        setUser(null);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      // Simulate API handshake with backend
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
      const activeUser: User = {
        ...mockDefaultUser,
        email: email || mockDefaultUser.email,
        name: email ? email.split('@')[0].toUpperCase() : mockDefaultUser.name,
      };
      setUser(activeUser);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, _password?: string) => {
    setIsLoading(true);
    try {
      // Simulate key generation and registration
      await new Promise<void>(resolve => setTimeout(() => resolve(), 600));
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name.trim() || 'New Cipher User',
        email: email.trim() || 'user@cipher.sec',
        username: name.toLowerCase().replace(/\s+/g, '_'),
        statusMessage: 'Secured via Cipher Protocol',
        fingerprint: 'SHA256:91ef:3c19:10aa:d021:78be:51f9:34c9:0088',
      };
      setUser(newUser);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 300));
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitializing,
        isLoading,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
