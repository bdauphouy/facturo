import type { Client } from '@prisma/client';

interface IDefinition {
	number: string;
	date: string;
	dueDate: string;
	client: Client;
	company: {
		name: string;
		address: string;
		zipCode: string;
		city: string;
		siret: string;
		naf: string;
		phone: string;
		email: string;
		website: string;
		logo: string;
	};
	items: Item[];
}

export type Item = {
	type: string;
	description: string;
	quantity: number;
	unitPrice: number;
};

export type DocumentBody<T> = Pick<T, 'clientId'> & { items: Item[] };

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
