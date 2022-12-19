import { api } from '$utils/api';
import { prisma } from '$utils/prisma';
import { describe, expect, it } from 'vitest';

const testInvoice = {
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

describe('create an invoice', async () => {
	await prisma.invoice.deleteMany();
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

	it('should create an invoice', async () => {
		const invoice = await api.createInvoice(testInvoice);

		expect(invoice).not.toMatch(/^{/);
	});
});

describe('get invoice', async () => {
	it('should get a single invoice', async () => {
		const client = await api.getClientById(1);

		const invoice = await api.getInvoiceById(client.invoices[0].id);

		expect(invoice).not.toMatch(/^{/);
	});
});
