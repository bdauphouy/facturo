import { prisma } from '$utils/prisma';
import type { User } from '@prisma/client';
import { json, type Action } from '@sveltejs/kit';
import { genSalt, hash } from 'bcrypt';

export const GET: Action = async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: {
			id: Number(params.id)
		}
	});

	return json(user);
};

export const PUT: Action = async ({ request, params }) => {
	const data: Omit<User, 'id' | 'createdAt'> = await request.json();

	const salt = await genSalt(12);
	const hashedPassword = await hash(data.password, salt);

	data.password = hashedPassword;

	const user: User = await prisma.user.update({
		where: {
			id: Number(params.id)
		},
		data
	});

	return json(user);
};

export const DELETE: Action = async ({ params }) => {
	const user = await prisma.user.delete({
		where: {
			id: Number(params.id)
		}
	});

	return json(user);
};
