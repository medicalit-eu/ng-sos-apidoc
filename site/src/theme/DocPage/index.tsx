import React from 'react';
import DocPage from '@theme-original/DocPage';
import type DocPageType from '@theme/DocPage';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof DocPageType>;

export default function DocPageWrapper(props: Props): JSX.Element {
  const location = useLocation();
  const isApiReference = location.pathname.includes('/api-reference');

  return (
    <div className={isApiReference ? 'api-reference-page' : ''}>
      <DocPage {...props} />
    </div>
  );
}
