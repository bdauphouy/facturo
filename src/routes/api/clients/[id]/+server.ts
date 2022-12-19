import { prisma } from '$utils/prisma';
import type { Client } from '@prisma/client';
import { json, type Action } from '@sveltejs/kit';

export const GET: Action = async ({ params }) => {
	const client = await prisma.client.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			invoices: true,
			creditNotes: true,
			quotes: true
		}
	});

	return json(client);
};

export const PUT: Action = async ({ request, params }) => {
	const data: Omit<Client, 'id' | 'createdAt'> = await request.json();

	const client = await prisma.client.update({
		where: {
			id: Number(params.id)
		},
		data
	});

	return json(client);
};

export const DELETE: Action = async ({ params }) => {
	const client = await prisma.client.delete({
		where: {
			id: Number(params.id)
		}
	});

	return json(client);
};
