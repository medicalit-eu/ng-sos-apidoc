import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Emergency Message Server',
      items: [
        'ems/overview',
        'ems/how-to',
        {
          type: 'link',
          label: 'API Reference',
          href: '/ng-sos-apidoc/docs/ems/api-reference/',
        },
      ],
    },
    {
      type: 'category',
      label: 'PSAP Connector',
      items: [
        'psap-connector/overview',
        'psap-connector/how-to',
        {
          type: 'link',
          label: 'API Reference',
          href: '/ng-sos-apidoc/docs/psap-connector/api-reference/',
        },
      ],
    },
    {
      type: 'category',
      label: 'Portal URL API',
      items: [
        'portal-url/overview',
        'portal-url/how-to',
        {
          type: 'link',
          label: 'API Reference',
          href: '/ng-sos-apidoc/docs/portal-url/api-reference/',
        },
      ],
    },
  ],
};

export default sidebars;
