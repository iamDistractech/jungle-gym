import type { EndpointOutput, RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";


export const get: RequestHandler = async(request) => {
	const response = await api(request, 'games')
	return response
}