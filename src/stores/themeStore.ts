import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState, Theme } from '../types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => {
        const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        return { theme: newTheme };
      }),
      setTheme: (theme: Theme) => set(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        return { theme };
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);