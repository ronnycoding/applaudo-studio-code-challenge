module.exports = function babelConfig(api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          alias: {
            components: './src/components',
            screens: './src/screens',
            theme: './src/theme',
            providers: './src/providers',
            config: './src/config',
          },
        },
      ],
    ],
  }
}
