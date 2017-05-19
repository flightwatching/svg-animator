// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-coverage'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      'dist/app/**/!(*spec).js': ['coverage'],
      './src/test.ts': ['@angular/cli']
    },
    coverageReporter: {
      dir : 'coverage/',
        reporters: [
          { type: 'html' },
          { type: 'lcov' }
        ]
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    angularCli: {
      config: './angular-cli.json',
      codeCoverage: 'coverage',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false
  });
};
