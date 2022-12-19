import { api } from '$utils/api';
import { prisma } from '$utils/prisma';
import { describe, expect, it } from 'vitest';

const testCreditNote = {
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

describe('create an credit note', async () => {
	await prisma.creditNote.deleteMany();
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

	it('should create a credit note', async () => {
		const creditNote = await api.createCreditNote(testCreditNote);

		expect(creditNote).not.toMatch(/^{/);
	});
});

describe('get credit note', async () => {
	it('should get a single credit note', async () => {
		const client = await api.getClientById(1);

		const creditNote = await api.getCreditNoteById(client.creditNotes[0].id);

		expect(creditNote).not.toMatch(/^{/);
	});
});
