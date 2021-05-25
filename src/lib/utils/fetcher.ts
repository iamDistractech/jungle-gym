export function fetcher(url: RequestInfo | URL, init?: RequestInit): unknown {
	const checkStatus = (response: Response): Response => {
		if (response.ok) return response;
		else throw new Error('Not ok');
	};

	const parseJson = (response: Response): Promise<unknown> => response.json();

	return fetch(url, init).then(checkStatus).then(parseJson);
}
