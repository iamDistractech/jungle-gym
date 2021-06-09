import type { JSONValue, ServerRequest } from '@sveltejs/kit/types/endpoint';

import { BASE_API_URL } from '$lib/Env';

export async function api(
	request: Request | ServerRequest,
	resource: string,
	data?: Record<string, unknown>
): Promise<{ status: number; body: JSONValue }> {
	const res = await fetch(`${BASE_API_URL}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});

	console.log(resource);

	return {
		status: res.status,
		body: await res.json()
	};
}
