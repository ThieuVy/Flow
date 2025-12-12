import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  isFirstLaunch: boolean;
  completeOnboarding: () => void;
  loginSuccess: () => Promise<void>; // Hàm mới: Gọi khi đăng nhập thành công
  checkFirstLaunch: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  isFirstLaunch: true,
  
  checkFirstLaunch: async () => {
    // Kiểm tra xem đã từng đăng nhập thành công chưa (thay vì chỉ kiểm tra đã xem onboarding chưa)
    const hasLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    set({ isFirstLaunch: hasLoggedIn !== 'true' });
  },
  
  // Hàm này chỉ chuyển màn hình tạm thời, KHÔNG lưu vào bộ nhớ
  completeOnboarding: () => {
    set({ isFirstLaunch: false });
  },

  // Hàm này mới lưu trạng thái để lần sau không hiện Onboarding nữa
  loginSuccess: async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    set({ isFirstLaunch: false });
  },

  logout: async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    set({ isFirstLaunch: true });
  }
}));