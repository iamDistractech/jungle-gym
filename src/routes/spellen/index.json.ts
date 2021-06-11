import type { RequestHandler } from '@sveltejs/kit';
import { api } from '../api/_api';

export const get: RequestHandler = async (request) => {
	const response = await api(request, `games?${request.query.toString()}`);

	return response;
};
