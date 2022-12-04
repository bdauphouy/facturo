import { PUBLIC_SITE_URL } from '$env/static/public';
import type { DocumentBody, Optional } from '$types';
import type { Client, CreditNote, Invoice, Quote, User } from '@prisma/client';

type RequestOptions = {
	returnType: 'json' | 'text';
};

export default class Api {
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	protected async get(
		path: string,
		headers: HeadersInit = {},
		options: RequestOptions = { returnType: 'json' }
	) {
		const response = await fetch(this.url + path, {
			method: 'GET',
			headers
		});

		return response[options.returnType]();
	}

	protected async post<T>(path: string, body: T, options: RequestOptions = { returnType: 'json' }) {
		const response = await fetch(this.url + path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return response[options.returnType]();
	}

	protected async put<T>(path: string, body: T) {
		const response = await fetch(this.url + path, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return response.json();
	}

	protected async delete(path: string) {
		const response = await fetch(this.url + path, {
			method: 'DELETE'
		});

		return response.json();
	}

	async getUsers() {
		return this.get('/api/users');
	}

	async getUserById(id: number) {
		return this.get(`/api/users/${id}`);
	}

	async createUser(user: Optional<Omit<User, 'createdAt'>, 'id'>) {
		return this.post<typeof user>('/api/users', user);
	}

	async updateUser(id: number, user: Optional<Omit<User, 'createdAt'>, 'id'>) {
		return this.put<typeof user>(`/api/users/${id}`, user);
	}

	async deleteUser(id: number) {
		return this.delete(`/api/users/${id}`);
	}

	async loginUser(email: string, password: string) {
		return this.post<Pick<User, 'email' | 'password'>>('/api/users/login', { email, password });
	}

	async getMe(token: string) {
		return this.get('/api/users/me', {
			Cookie: `token=${token}`
		});
	}

	async getClients() {
		return this.get('/api/clients');
	}

	async getClientById(id: number) {
		return this.get(`/api/clients/${id}`);
	}

	async createClient(client: Optional<Omit<Client, 'createdAt'>, 'id'>) {
		return this.post<typeof client>('/api/clients', client);
	}

	async updateClient(id: number, client: Optional<Omit<Client, 'createdAt'>, 'id'>) {
		return this.put<typeof client>(`/api/clients/${id}`, client);
	}

	async deleteClient(id: number) {
		return this.delete(`/api/clients/${id}`);
	}

	async createInvoice(data: DocumentBody<Invoice>) {
		return this.post<typeof data>('/api/invoice', data, {
			returnType: 'text'
		});
	}

	async getInvoiceById(id: number) {
		return this.get(
			`/api/invoice/${id}`,
			{},
			{
				returnType: 'text'
			}
		);
	}

	async createQuote(data: DocumentBody<Quote>) {
		return this.post<typeof data>('/api/quote', data, {
			returnType: 'text'
		});
	}

	async getQuoteById(id: number) {
		return this.get(
			`/api/quote/${id}`,
			{},
			{
				returnType: 'text'
			}
		);
	}

	async createCreditNote(data: DocumentBody<CreditNote>) {
		return this.post<typeof data>('/api/credit-note', data, {
			returnType: 'text'
		});
	}

	async getCreditNoteById(id: number) {
		return this.get(
			`/api/credit-note/${id}`,
			{},
			{
				returnType: 'text'
			}
		);
	}
}

export const api = new Api(PUBLIC_SITE_URL);
