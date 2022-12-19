import type { Action } from '@sveltejs/kit';

export const POST: Action = async ({ cookies }) => {
	cookies.delete('token');

	return new Response(null, {
		status: 200
	});
};
