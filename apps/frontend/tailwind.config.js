const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      spacing: {
        0.5: '0.125rem',
        4.5: '1.125rem',
        4.8: '1.2rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
      },
      zIndex: {
        max: '2147483647',
      },
    },
  },
  plugins: [],
};
