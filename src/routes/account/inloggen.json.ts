import type { Request, RequestHandler } from '@sveltejs/kit';
import { user } from './_mockAccounts';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as cookie from 'cookie';
import sessionDB from './_session';

export const post: RequestHandler = async (request: Request) => {
	const { body } = request;

	if (!sessionDB)
		return {
			status: 500,
			body: { message: 'SessionDB offline' }
		};

	if (body.username !== user.username || body.password !== user.password)
		return {
			status: 401,
			body: { message: 'Incorrect email or password' }
		};

	const cookieId = uuidv4();

	await sessionDB.set(cookieId, JSON.stringify(user))

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge: 60 * 60 * 24,
			sameSite: true,
			path: '/'
		})
	};

	return {
		status: 200,
		headers,
		body: { message: 'success', user }
	};
};
