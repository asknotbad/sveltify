const {build} = require(`esbuild`);
const sveltePlugin = require(`esbuild-svelte`);

const pkg = require(`./package.json`);

const svelte = sveltePlugin({
  compileOptions:{
    css: true
  }
});

build({
  entryPoints: [pkg.svelte],
  outfile: pkg.cdn,
  format: 'iife',
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [svelte],
  globalName: 'sveltify',
})

build({
  entryPoints: [pkg.svelte],
  outfile: pkg.module,
  format: 'esm',
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [svelte],

  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ]
})