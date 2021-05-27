import type { JSONValue, ServerRequest } from '@sveltejs/kit/types/endpoint';

const base = import.meta.env.VITE_API_URL;

export async function api(
	request: Request | ServerRequest,
	resource: string,
	data?: Record<string, unknown>
): Promise<{ status: number; body: JSONValue }> {
	const res = await fetch(`${base}/${resource}`, {
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
