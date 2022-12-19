import { JWT_SECRET } from '$env/static/private';
import type { User } from '@prisma/client';
import { error, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const unprotected = [
	['/api/users', 'POST'],
	['/api/users/login', 'POST']
];

export const handle = (async ({ event, resolve }) => {
	if (
		unprotected.some(
			([path, method]) => event.url.pathname.startsWith(path) && event.request.method === method
		) ||
		!event.url.pathname.startsWith('/api')
	) {
		return resolve(event);
	}

	const token = event.cookies.get('token');

	if (!token) {
		throw error(401);
	}

	const decoded = jwt.verify(token, JWT_SECRET) as Pick<User, 'id'>;

	if (!decoded.id) {
		throw error(401);
	}

	return resolve(event);
}) satisfies Handle;
