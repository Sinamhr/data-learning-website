import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Data Learning',
  tagline: 'A guided framework for choosing methods based on your data, task, and constraints.',
  favicon: 'img/logo.svg',

  url: 'https://rossellaarcucci.com',
  baseUrl: '/data-learning/',

  organizationName: 'your-org',
  projectName: 'data-learning',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          sidebarCollapsible: false,
          sidebarCollapsed: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/illustration.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Data Learning',
      logo: {
        alt: 'Data Learning Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/wizard', label: 'Get started', position: 'right'},

        {
          type: 'dropdown',
          label: 'Methods',
          position: 'right',
          items: [
            {to: '/docs/methods/overview', label: 'Overview'},
            {to: '/docs/methods/foundation-transfer', label: 'Foundation / transfer'},
            {to: '/docs/methods/physics-informed', label: 'Physics-informed / hybrid'},
            {to: '/docs/methods/sequence-dynamics', label: 'Sequence / dynamics'},
            {to: '/docs/methods/graph-geometric', label: 'Graph / geometric / meshes'},
            {to: '/docs/methods/explainability-uncertainty', label: 'Explainability / uncertainty'},
            {to: '/docs/methods/generative-synthetic', label: 'Generative / synthetic'},
            {to: '/docs/methods/reinforcement-learning', label: 'Reinforcement learning'},
          ],
        },

        {
          type: 'dropdown',
          label: 'Data challenges',
          position: 'right',
          items: [
            {to: '/docs/data-challenges/overview', label: 'Overview'},
            {to: '/docs/data-challenges/small-data', label: 'Small data'},
            {to: '/docs/data-challenges/big-data', label: 'Big data'},
            {to: '/docs/data-challenges/unstructured', label: 'Unstructured data'},
            {to: '/docs/data-challenges/noisy', label: 'Noisy data'},
            {to: '/docs/data-challenges/incomplete', label: 'Incomplete data'},
            {to: '/docs/data-challenges/dynamic', label: 'Dynamic data'},
            {to: '/docs/data-challenges/confidential', label: 'Confidential data'},
          ],
        },

        {
          type: 'dropdown',
          label: 'Concepts',
          position: 'right',
          items: [
            {to: '/docs/concepts/overview', label: 'Overview'},
            {to: '/docs/concepts/modality', label: 'Data modality'},
            {to: '/docs/concepts/task', label: 'Task type'},
            {to: '/docs/concepts/data-volume', label: 'Data volume'},
            {to: '/docs/concepts/constraints', label: 'Constraints'},
            {to: '/docs/concepts/quality-labels', label: 'Quality / labels'},
            {to: '/docs/concepts/dynamics', label: 'Dynamics'},
            {to: '/docs/concepts/recommendation-types', label: 'Recommendation types'},
          ],
        },

        {
          type: 'dropdown',
          label: 'About',
          position: 'right',
          items: [
            {to: '/docs/intro', label: 'Overview'},
            {to: '/docs/about', label: 'About the project'},
          ],
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [],
      copyright: `
        <a href="https://www.imperial.ac.uk/earth-science/research/research-groups/datalearning/" target="_blank" rel="noopener noreferrer">
          Data Learning group page
        </a>
      `,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;


        