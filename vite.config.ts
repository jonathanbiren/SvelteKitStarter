/*
import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from 'vitest/config';


export default defineConfig({
	plugins: [sveltekit(), ],
	optimizeDeps: {
		exclude: ['fsevents']
	},
	test: {
		globals: true,
		include: ['src/!**!/!*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
	}
});
*/
import { after } from 'node:test';

/*
Above code can be commented back in after  testing
*/
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['fsevents', '@mapbox/node-pre-gyp']  // Exclude `@mapbox/node-pre-gyp` from dependency optimization
	},
	test: {
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom'
	},
	ssr: {
		noExternal: ['@mapbox/node-pre-gyp']  // Prevent Vite from trying to bundle or process this package
	}
});
