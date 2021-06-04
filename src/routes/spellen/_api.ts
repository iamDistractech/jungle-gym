import type { JSONValue, ServerRequest } from '@sveltejs/kit/types/endpoint';

import { BASE_API_URL, BASE_STRAPI_API_URL } from '$lib/Env';

export async function api(
	request: Request | ServerRequest,
	resource: string,
	data?: Record<string, unknown>
): Promise<{ status: number; body: JSONValue }> {
	const api = BASE_STRAPI_API_URL ? 'Strapi' : 'JungleGym';
	console.log(`Using ${api} API`);

	const res = await fetch(`${BASE_STRAPI_API_URL || BASE_API_URL}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});

	return {
		status: res.status,
		body: await res.json()
	};
}
