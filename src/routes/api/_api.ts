import { BASE_API_URL } from '$lib/Env';
import type { BaseBody } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function api(
	request: ServerRequest,
	resource: string,
	data?: Record<string, unknown> | string | BaseBody
): Promise<Response> {
	const { locals, method } = request;
	const { authenticated, accessToken, sessionId } = locals;

	const headers = new Headers({ 'Content-Type': 'application/json' });

	if (authenticated && accessToken && sessionId) {
		headers.append('Authorization', `Bearer ${accessToken}`);
	}

	return fetch(`${BASE_API_URL}/${resource}`, {
		method,
		headers,
		body: data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined
	});
}
