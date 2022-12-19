import { readFileSync } from 'fs';

import { getStaticPath } from '$utils/methods';
import { error, type Action } from '@sveltejs/kit';

export const GET: Action = async ({ params }) => {
	let file: Buffer;

	try {
		file = readFileSync(
			getStaticPath() + `/credit-notes/${[(params.id ?? 1).toString().padStart(5, '0')]}.pdf`
		);
	} catch (err) {
		throw error(404);
	}

	return new Response(file, {
		headers: {
			'Content-Type': 'application/pdf'
		}
	});
};
