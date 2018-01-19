module.exports = [
  {
    entry: './lib/index.js',
    target: 'web',
    output: {
      library: 'Censys',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: './build/censys.web.js'
    }
  },
  {
    entry: './lib/index.js',
    target: 'node',
    output: {
      library: 'Censys',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: './build/censys.js'
    }
  }
];
