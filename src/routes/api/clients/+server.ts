import { prisma } from '$utils/prisma';
import type { Client } from '@prisma/client';
import { json, type Action } from '@sveltejs/kit';

export const POST: Action = async ({ request }) => {
	const data: Omit<Client, 'id' | 'createdAt'> = await request.json();

	const client = await prisma.client.create({
		data
	});

	return json(client);
};

export const GET: Action = async () => {
	const clients = await prisma.client.findMany({
		include: {
			invoices: true,
			creditNotes: true,
			quotes: true
		}
	});

	return json(clients);
};
