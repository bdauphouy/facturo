import { api } from '$utils/api';
import { prisma } from '$utils/prisma';
import { describe, expect, it } from 'vitest';

const testClient = {
	id: 1,
	email: 'client@test.com',
	firstName: 'Lorem',
	lastName: 'Ipsum',
	address: '1 rue du Lorem Ipsum',
	zipCode: '75001',
	city: 'Paris',
	website: 'example.com',
	phone: '01 02 03 04 05'
};

describe('create a client', async () => {
	await prisma.client.deleteMany();

	it('should create a client', async () => {
		const client = await api.createClient(testClient);

		expect(client).toEqual({
			...testClient,
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
		});
	});
});

describe('get clients', () => {
	it('should get all clients', async () => {
		const clients = await api.getClients();

		expect(clients).toEqual([
			{
				...testClient,
				createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
				creditNotes: [],
				invoices: [],
				quotes: []
			}
		]);
	});
	it('should get a single client', async () => {
		const client = await api.getClientById(1);

		expect(client).toEqual({
			...testClient,
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
			creditNotes: [],
			invoices: [],
			quotes: []
		});
	});
});

describe('update a client', async () => {
	it('should update a client', async () => {
		const client = await api.updateClient(1, {
			...testClient,
			firstName: 'Updated'
		});

		expect(client).toEqual({
			...testClient,
			firstName: 'Updated',
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
		});
	});
});

describe('delete a client', async () => {
	it('should delete a client', async () => {
		const client = await api.deleteClient(1);

		expect(client).toEqual({
			...testClient,
			firstName: 'Updated',
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
		});
	});
});
