import React from 'react';
import Layout from '@theme-original/DocRoot/Layout';
import type LayoutType from '@theme/DocRoot/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  const location = useLocation();
  const isApiReference = location.pathname.includes('/api-reference');

  if (isApiReference) {
    return (
      <div className="api-reference-page">
        <Layout {...props} />
      </div>
    );
  }

  return <Layout {...props} />;
}
