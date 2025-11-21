// postcss.config.js
module.exports = {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: 375,
        exclude: [/node_modules\/vant/],
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        include: /\/src\//,
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 667,
      }
    }
  };