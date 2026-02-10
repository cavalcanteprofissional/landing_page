import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState, Theme } from '../types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => {
        const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
        return { theme: newTheme };
      }),
      setTheme: (theme: Theme) => set(() => {
        return { theme };
      }),
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme class immediately when storage is rehydrated
        if (state?.theme) {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(state.theme);
        }
      },
    }
  )
);