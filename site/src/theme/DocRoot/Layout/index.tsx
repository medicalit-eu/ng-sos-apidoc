import React, {type ReactNode, useState, useCallback} from 'react';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {prefersReducedMotion} from '@docusaurus/theme-common';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import {SidebarToggleContext} from '@site/src/contexts/SidebarToggleContext';
import type {Props} from '@theme/DocRoot/Layout';

import styles from './styles.module.css';

export default function DocRootLayout({children}: Props): ReactNode {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    // onTransitionEnd won't fire when sidebar animation is disabled
    // fixes https://github.com/facebook/docusaurus/issues/8918
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);

  // Create a wrapper for setHiddenSidebarContainer that also handles hiddenSidebar
  const wrappedSetHiddenSidebarContainer = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof value === 'function' ? value(hiddenSidebarContainer) : value;
    if (newValue && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer(value);
  }, [hiddenSidebarContainer]);

  return (
    <SidebarToggleContext.Provider 
      value={{toggleSidebar, hiddenSidebarContainer}}
    >
      <div className={styles.docsWrapper}>
        <BackToTopButton />
        <div className={styles.docRoot}>
          {sidebar && (
            <DocRootLayoutSidebar
              sidebar={sidebar.items}
              hiddenSidebarContainer={hiddenSidebarContainer}
              setHiddenSidebarContainer={wrappedSetHiddenSidebarContainer}
            />
          )}
          <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
            {children}
          </DocRootLayoutMain>
        </div>
      </div>
    </SidebarToggleContext.Provider>
  );
}
