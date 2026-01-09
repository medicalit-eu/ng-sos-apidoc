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
          routeBasePath: '/', // Serve docs at the site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/medicalit-eu/ng-sos-apidoc/tree/main/',
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
          label: 'Documentation',
        },
        {
          href: 'https://github.com/medicalit-eu/ng-sos-apidoc',
          label: 'GitHub',
          position: 'right',
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
              to: '/getting-started',
            },
            {
              label: 'EMS API',
              to: '/ems/overview',
            },
            {
              label: 'PSAP Connector',
              to: '/psap-connector/overview',
            },
            {
              label: 'Portal URL API',
              to: '/portal-url/overview',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: 'EMS OpenAPI Spec',
              href: 'https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-ems-v1.0.0.yaml',
            },
            {
              label: 'PSAP Connector Spec',
              href: 'https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-psap-connector-v2.0.0.yaml',
            },
            {
              label: 'Portal URL Spec',
              href: 'https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-portal-url-v1.0.0.yaml',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/medicalit-eu/ng-sos-apidoc',
            },
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
