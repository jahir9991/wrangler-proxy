const { exec } = require('child_process');

require('esbuild').build({
  entryPoints: ['index.ts'],
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  external: ['cloudflare:email'],
  plugins: [
    {
      name: 'on-end',
      setup(build) {
        build.onStart(() => {
          console.log('Cleaning up...');
          exec('rm -rf dist');
        });
        build.onEnd(() => {
          console.log('Building types...');
          exec('npx tsc --outDir dist');
          console.log('Build success!');
        });
      },
    },
  ],
});
