import React, {createContext, useContext, type ReactNode} from 'react';

type SidebarToggleContextValue = {
  hiddenSidebarContainer: boolean;
  setHiddenSidebarContainer: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const SidebarToggleContext = createContext<SidebarToggleContextValue | null>(null);

export function SidebarToggleProvider({
  children,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: {
  children: ReactNode;
  hiddenSidebarContainer: boolean;
  setHiddenSidebarContainer: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
  const value: SidebarToggleContextValue = {
    hiddenSidebarContainer,
    setHiddenSidebarContainer,
  };

  return (
    <SidebarToggleContext.Provider value={value}>
      {children}
    </SidebarToggleContext.Provider>
  );
}

export function useSidebarToggle(): SidebarToggleContextValue | null {
  return useContext(SidebarToggleContext);
}
