import { JWT_SECRET } from '$env/static/private';
import { prisma } from '$utils/prisma';
import type { User } from '@prisma/client';
import { error, json, type Action } from '@sveltejs/kit';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const POST: Action = async ({ request, cookies }) => {
	const data: Pick<User, 'email' | 'password'> = await request.json();

	const user = await prisma.user.findUnique({
		where: {
			email: data.email
		}
	});

	if (!user) {
		throw error(404);
	}

	const result = await compare(data.password, user.password);

	if (!result) {
		throw error(401);
	}

	const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
	cookies.set('token', token);

	return json({ token });
};
