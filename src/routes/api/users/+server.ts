import { prisma } from '$utils/prisma';
import type { User } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { error, json, type Action } from '@sveltejs/kit';
import { genSalt, hash } from 'bcrypt';

export const POST: Action = async ({ request }) => {
	const data: Omit<User, 'id' | 'createdAt'> = await request.json();

	const salt = await genSalt(12);
	const hashedPassword = await hash(data.password, salt);

	data.password = hashedPassword;

	let user: User | null = null;

	try {
		user = await prisma.user.create({
			data
		});
	} catch (e) {
		if (e instanceof PrismaClientValidationError) {
			throw error(400);
		}
	}

	return json(user);
};

export const GET: Action = async () => {
	const users = await prisma.user.findMany();

	return json(users);
};
