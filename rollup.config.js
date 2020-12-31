import babel from '@rollup/plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default [
  {
    input: 'src/index.js',
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
    },
    external: [],
    plugins: [
      babel(),
      sourcemaps(),
    ],
  }
];
