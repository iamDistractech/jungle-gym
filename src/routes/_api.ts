import type { JSONValue } from '@sveltejs/kit/types/endpoint';

import { BASE_API_URL } from '$lib/Env';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function api(
	request: ServerRequest,
	resource: string,
	data?: Record<string, unknown>
): Promise<{ status: number; body: JSONValue }> {
	const { locals, method } = request;
	const { authenticated, accessToken, sessionId } = locals;

	const headers = new Headers({ 'Content-Type': 'application/json' });

	if (authenticated && accessToken && sessionId) {
		headers.append('Authorization', `Bearer ${accessToken}`);
	}

	const res = await fetch(`${BASE_API_URL}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});

	const result = {
		status: res.status,
		body: res.body ? await res.json() : undefined
	};

	if (res.ok) {
		return result;
	} else {
		throw result;
	}
}
