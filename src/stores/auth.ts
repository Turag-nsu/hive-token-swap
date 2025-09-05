import { create } from 'zustand';
import { UserProfile } from '@/types/social';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  userProfile: UserProfile | null;
  authMethod: 'keychain' | 'hivesigner' | null;
  login: (username: string, method: 'keychain' | 'hivesigner', profile?: UserProfile) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  setAuthMethod: (method: 'keychain' | 'hivesigner') => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  isAuthenticated: false,
  username: null,
  userProfile: null,
  authMethod: null,

  login: (username: string, method: 'keychain' | 'hivesigner', profile?: UserProfile) => {
    console.log('Auth store login called with:', { username, method, profile });
    set({
      isAuthenticated: true,
      username,
      authMethod: method,
      userProfile: profile || null
    });
    console.log('Auth store state after login:', get());
  },

  logout: () => {
    console.log('Auth store logout called');
    set({
      isAuthenticated: false,
      username: null,
      userProfile: null,
      authMethod: null
    });
  },

  updateProfile: (profile: UserProfile) => {
    console.log('Auth store updateProfile called with:', profile);
    set({ userProfile: profile });
  },

  setAuthMethod: (method: 'keychain' | 'hivesigner') => {
    set({ authMethod: method });
  }
}));
