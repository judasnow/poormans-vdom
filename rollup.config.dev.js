import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: false,
      name: 'upload',
    },
    plugins: [
      typescript(),
      serve({
        contentBase: 'dist',
        host: '0.0.0.0',
        port: '9001',
      }),
    ],
  },
];
