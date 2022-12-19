import { api } from '$utils/api';
import { prisma } from '$utils/prisma';
import { describe, expect, it } from 'vitest';

const testUser = {
	id: 1,
	email: 'user@test.com',
	password: 'user123',
	firstName: 'Lorem',
	lastName: 'Ipsum',
	role: 'ADMIN'
};

describe('create a user', async () => {
	await prisma.user.deleteMany();

	it('should create a user', async () => {
		const user = await api.createUser(testUser);

		expect(user).toEqual({
			...testUser,
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
			password: expect.stringMatching(/^\$2[ayb]\$.{56}$/)
		});
	});
});

describe('login a user', async () => {
	let userToken: string;

	it('should login a user', async () => {
		const user = await api.loginUser(testUser.email, testUser.password);

		userToken = user.token;

		expect(user).toEqual({
			token: expect.stringMatching(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/)
		});
	});
	it('should get my user data', async () => {
		const user = await api.getMe(userToken);

		expect(user).toEqual({
			...testUser,
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
			password: expect.stringMatching(/^\$2[ayb]\$.{56}$/)
		});
	});
});

describe('get users', () => {
	it('should get all users', async () => {
		const users = await api.getUsers();

		expect(users).toEqual([
			{
				...testUser,
				createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
				password: expect.stringMatching(/^\$2[ayb]\$.{56}$/)
			}
		]);
	});
	it('should get a single user', async () => {
		const user = await api.getUserById(1);

		expect(user).toEqual({
			...testUser,
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
			password: expect.stringMatching(/^\$2[ayb]\$.{56}$/)
		});
	});
});

describe('update a user', async () => {
	it('should update a user', async () => {
		const user = await api.updateUser(1, {
			...testUser,
			firstName: 'Updated'
		});

		expect(user).toEqual({
			...testUser,
			firstName: 'Updated',
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
			password: expect.stringMatching(/^\$2[ayb]\$.{56}$/)
		});
	});
});

describe('delete a user', async () => {
	it('should delete a user', async () => {
		const user = await api.deleteUser(1);

		expect(user).toEqual({
			...testUser,
			firstName: 'Updated',
			createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
			password: expect.stringMatching(/^\$2[ayb]\$.{56}$/)
		});
	});
});
