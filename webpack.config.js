module.exports = {
  entry: './lib/index.js',
  output: {
    library: 'Censys',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: './build/censys.js'
  }
};
