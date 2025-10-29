import * as esbuild from 'esbuild';
import { readFileSync } from 'fs';

const watch = process.argv.includes('--watch');

const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/plugin.js',
    format: 'iife',
    platform: 'browser',
    target: 'esnext',
    minify: !watch,
    sourcemap: watch ? 'inline' : false,
    logLevel: 'info'
});

if (watch) {
    console.log('Watching for changes...');
    await ctx.watch();
} else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log('Build complete!');
}
