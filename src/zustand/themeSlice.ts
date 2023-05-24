import { StateCreator, create } from 'zustand';

import { Theme } from '@/types/theme';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

export type ThemeStates = {
  currentTheme: Theme;
}
type ThemeSlice = ThemeStates & {}

const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  currentTheme: 'neutral'
});

export const useThemeStore = create<ThemeSlice>()(
  immer(devtools(
    (...a) => ({
      ...createThemeSlice(...a),
    })
  ))
);

export const setTheme = (theme: Theme ) => useThemeStore.setState({ currentTheme: theme });