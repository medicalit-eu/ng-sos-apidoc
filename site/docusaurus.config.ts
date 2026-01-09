import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'NG SOS API Documentation',
  tagline: 'Comprehensive API documentation for the NG SOS emergency services platform',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://medicalit-eu.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ng-sos-apidoc/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'medicalit-eu', // Usually your GitHub org/user name.
  projectName: 'ng-sos-apidoc', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'NG SOS API',
      logo: {
        alt: 'NG SOS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'NG SOS API Documentation',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'EMS API',
              to: '/docs/ems/overview',
            },
            {
              label: 'PSAP Connector',
              to: '/docs/psap-connector/overview',
            },
            {
              label: 'Portal URL API',
              to: '/docs/portal-url/overview',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: 'EMS API Reference',
              to: '/docs/ems/api-reference',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            {
              label: 'PSAP Connector API Reference',
              to: '/docs/psap-connector/api-reference',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            {
              label: 'Portal URL API Reference',
              to: '/docs/portal-url/api-reference',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Contact',
              href: 'mailto:mdybal@medicalit.eu',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Medical IT EU. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
