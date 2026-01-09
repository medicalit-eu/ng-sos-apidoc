import React, {type ReactNode} from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type {WrapperProps} from '@docusaurus/types';
import {useSidebarToggle} from '../DocRoot/Layout/SidebarToggleContext';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import IconMenu from '@theme/Icon/Menu';

type Props = WrapperProps<typeof DocBreadcrumbsType>;

export default function DocBreadcrumbsWrapper(props: Props): ReactNode {
  const sidebarToggle = useSidebarToggle();
  const sidebar = useDocsSidebar();

  // Only show menu toggle if:
  // 1. There is a sidebar
  // 2. The sidebar is hidden
  // 3. We have the toggle context available
  const showMenuToggle = sidebar && sidebarToggle && sidebarToggle.hiddenSidebarContainer;

  const handleMenuToggle = () => {
    if (sidebarToggle) {
      sidebarToggle.setHiddenSidebarContainer(false);
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
      {showMenuToggle && (
        <button
          type="button"
          aria-label="Open navigation menu"
          className="clean-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem',
            cursor: 'pointer',
          }}
          onClick={handleMenuToggle}
        >
          <IconMenu />
        </button>
      )}
      <DocBreadcrumbs {...props} />
    </div>
  );
}
