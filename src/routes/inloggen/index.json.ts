import type { Request, RequestHandler } from '@sveltejs/kit';
import { userStore } from '$lib/Stores/mockUser';
import { v4 as uuidv4 } from 'uuid';
import * as cookie from 'cookie';
import sessionDB from '$lib/Utils/sessionDB';

export const post: RequestHandler = async (request: Request) => {
	if (!sessionDB)
		return {
			status: 500,
			body: { message: 'SessionDB offline' }
		};

	let user;
	const userUnsub = userStore.subscribe((currentUSer) => (user = currentUSer));
	userUnsub();

	const { body } = request;

	if (body.username !== user.username || body.password !== user.password)
		return {
			status: 401,
			body: { message: 'Incorrect email or password' }
		};

	try {
		const cookieId = uuidv4();

		const sessionSuccess = await sessionDB.set(cookieId, JSON.stringify(user));

		console.log(sessionSuccess);
		if (sessionSuccess !== 'OK')
			return {
				status: 500,
				body: { message: 'error' }
			};

		const headers = {
			'Set-Cookie': cookie.serialize('session_id', cookieId, {
				httpOnly: true,
				maxAge: 60 * 60 * 24,
				sameSite: true,
				path: '/'
			}),
			'Content-Type': 'application/json'
		};

		return {
			status: 200,
			headers,
			body: { message: 'success', user }
		};
	} catch (error) {
		console.error(error);

		return {
			status: 500,
			body: { message: 'error' }
		};
	}
};
