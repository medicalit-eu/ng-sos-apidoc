import React, {type ReactNode} from 'react';
import DocPage from '@theme-original/DocPage';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof DocPage>;

export default function DocPageWrapper(props: Props): ReactNode {
  const location = useLocation();
  const isApiReference = location.pathname.endsWith('/api-reference');

  return (
    <div className={isApiReference ? 'api-reference-page' : ''}>
      <DocPage {...props} />
    </div>
  );
}
