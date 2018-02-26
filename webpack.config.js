const path = require('path');
module.exports = [
  {
    entry: './lib/index.js',
    target: 'web',
    output: {
      library: 'Censys',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: 'censys.web.js',
      path: path.resolve(__dirname, 'build')
    }
  },
  {
    entry: './lib/index.js',
    target: 'node',
    output: {
      library: 'Censys',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: 'censys.js',
      path: path.resolve(__dirname, 'build')
    }
  }
];
