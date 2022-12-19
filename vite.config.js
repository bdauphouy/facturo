import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['tests/unit/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			$src: path.resolve('src'),
			$utils: path.resolve('src/utils'),
			$types: path.resolve('src/types.d.ts')
		}
	}
};

export default config;
