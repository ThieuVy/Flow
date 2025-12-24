import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  user: any | null;
  isInitializing: boolean;
  isFirstLaunch: boolean; // 1. Thêm state này
  setUser: (user: any | null) => void;
  logout: () => Promise<void>;
  checkFirstLaunch: () => Promise<void>; // 2. Thêm action này
  completeOnboarding: () => Promise<void>; // 3. Thêm action này
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isInitializing: true,
  isFirstLaunch: true, // Giá trị mặc định

  setUser: (user) => {
    set({ user, isInitializing: false });
    if (user) {
      AsyncStorage.setItem('isLoggedIn', 'true');
    } else {
      AsyncStorage.removeItem('isLoggedIn');
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    set({ user: null });
  },

  // 4. Logic kiểm tra lần đầu mở app
  checkFirstLaunch: async () => {
    try {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      if (alreadyLaunched === null) {
        set({ isFirstLaunch: true });
      } else {
        set({ isFirstLaunch: false });
      }
    } catch (error) {
      set({ isFirstLaunch: true });
    }
  },

  // 5. Logic hoàn thành onboarding
  completeOnboarding: async () => {
    try {
      await AsyncStorage.setItem('alreadyLaunched', 'true');
      set({ isFirstLaunch: false });
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
  },
}));