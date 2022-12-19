import { JWT_SECRET } from '$env/static/private';
import { prisma } from '$utils/prisma';
import type { User } from '@prisma/client';
import { json, type Action } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const GET: Action = async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		return json({ error: 'Not logged in' });
	}

	const decoded = jwt.verify(token, JWT_SECRET) as Pick<User, 'id'>;

	const user: User | null = await prisma.user.findUnique({
		where: {
			id: decoded.id
		}
	});

	return json(user);
};
