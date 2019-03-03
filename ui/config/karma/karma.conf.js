process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
const paths = require('../paths');

const webpackConfig = require('../webpack.config.js');

webpackConfig.resolve = {
  alias: {
    enzyme: require.resolve('./enzyme.js'),
    chai: require.resolve('./chai.js'),
  },
};

module.exports = function doConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      // require.resolve('babel-polyfill/dist/polyfill.js'),
      {
        pattern: `${paths.appSrc}/**/*.spec.tsx`,
        watched: false,
      },
    ],
    exclude: [],
    junitReporter: {
      useBrowserName: false,
      outputFile: 'test-results.xml',
    },
    preprocessors: {
      // 'config/karma/**/*.js': ['webpack', 'sourcemap'],
      [`${paths.appSrc}/**/*.tsx`]: ['webpack', 'sourcemap'],
      [`${paths.appSrc}/**/*.ts`]: ['webpack', 'sourcemap'],

    },
    webpack: webpackConfig,
    // reporters: ['progress', 'junit'],
    reporters: ['mocha'],
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed',
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x',
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
  });
}