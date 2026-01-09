import {createContext, useContext} from 'react';

export type SidebarToggleContextValue = {
  toggleSidebar: () => void;
  hiddenSidebarContainer: boolean;
};

export const SidebarToggleContext = createContext<SidebarToggleContextValue | null>(null);

export function useSidebarToggle(): SidebarToggleContextValue | null {
  return useContext(SidebarToggleContext);
}
