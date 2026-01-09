import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import {useSidebarToggle} from '@site/src/contexts/SidebarToggleContext';

import styles from './styles.module.css';

// TODO move to design system folder
function BreadcrumbsItemLink({
  children,
  href,
  isLast,
  isCategory,
  onToggleSidebar,
}: {
  children: ReactNode;
  href: string | undefined;
  isLast: boolean;
  isCategory?: boolean;
  onToggleSidebar?: () => void;
}): ReactNode {
  const className = 'breadcrumbs__link';
  
  // For category items, make them clickable to toggle sidebar
  if (isCategory && onToggleSidebar) {
    return (
      <button 
        className={clsx(className, styles.categoryLink)}
        onClick={(e) => {
          e.preventDefault();
          // Try to trigger the mobile navigation toggle
          const navToggle = document.querySelector('[aria-label="Toggle navigation bar"]') as HTMLButtonElement;
          if (navToggle) {
            navToggle.click();
          } else {
            // Fallback to the context toggle
            onToggleSidebar();
          }
        }}
        type="button"
        aria-label="Toggle sidebar"
      >
        <span>{children}</span>
      </button>
    );
  }
  
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

// TODO move to design system folder
function BreadcrumbsItem({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}): ReactNode {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const sidebarToggle = useSidebarToggle();
  
  // Check if we're on an API reference page where sidebar is hidden
  const isApiReferencePage = typeof window !== 'undefined' && 
    document.querySelector('.api-reference-page') !== null;

  if (!breadcrumbs) {
    return null;
  }

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const isCategory = item.type === 'category';
            const href =
              isCategory && item.linkUnlisted
                ? undefined
                : item.href;
            
            // Make category items clickable to toggle sidebar when sidebar is hidden
            const shouldToggleSidebar = isCategory && !isLast && 
              (sidebarToggle?.hiddenSidebarContainer || isApiReferencePage);
            
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink 
                  href={shouldToggleSidebar ? undefined : href} 
                  isLast={isLast}
                  isCategory={shouldToggleSidebar}
                  onToggleSidebar={shouldToggleSidebar ? sidebarToggle?.toggleSidebar : undefined}
                >
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
