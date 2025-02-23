import { create } from 'zustand'

interface GlobalState {
  isDarkMode: boolean
  isSidebarCollapsed: boolean
  toggleDarkMode: () => void
  toggleSidebar: () => void
}

export const useStore = create<GlobalState>((set) => ({
  isDarkMode: false,
  isSidebarCollapsed: false,
  toggleDarkMode: () => set({ isDarkMode: !useStore.getState().isDarkMode }),
  toggleSidebar: () => set({ isSidebarCollapsed: !useStore.getState().isSidebarCollapsed }),
})) 