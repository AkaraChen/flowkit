import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ['./src/index.ts'],
    format: ['esm'],
    dts: true,
    external: [/^react/, /^@xyflow/],
});
