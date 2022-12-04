import { api } from '$utils/api';
import { prisma } from '$utils/prisma';
import { describe, expect, it } from 'vitest';

const testQuote = {
	clientId: 1,
	items: [
		{
			type: 'Jours',
			description: 'Petite description',
			quantity: 3,
			unitPrice: 300
		}
	]
};

describe('create an quote', async () => {
	await prisma.quote.deleteMany();
	await prisma.client.deleteMany();

	await api.createClient({
		id: 1,
		email: 'client@test.com',
		firstName: 'Lorem',
		lastName: 'Ipsum',
		address: '1 rue du Lorem Ipsum',
		zipCode: '75001',
		city: 'Paris',
		website: 'example.com',
		phone: '01 02 03 04 05'
	});

	it('should create a quote', async () => {
		const quote = await api.createQuote(testQuote);

		expect(quote).not.toMatch(/^{/);
	});
});

describe('get quote', async () => {
	it('should get a single quote', async () => {
		const client = await api.getClientById(1);

		const quote = await api.getQuoteById(client.quotes[0].id);

		expect(quote).not.toMatch(/^{/);
	});
});
