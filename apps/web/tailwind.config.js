const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        alegreya: ['Alegreya Sans SC', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      colors: { 'primary-color': '#1d2b4e', 'secondary-color': '#f24928' },
    },
  },
  plugins: [],
};
