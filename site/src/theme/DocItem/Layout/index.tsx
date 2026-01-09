import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  const {metadata} = useDoc();
  const isApiReference = metadata.id.includes('api-reference');

  if (isApiReference) {
    return (
      <div className="api-reference-page">
        <Layout {...props} />
      </div>
    );
  }

  return <Layout {...props} />;
}
