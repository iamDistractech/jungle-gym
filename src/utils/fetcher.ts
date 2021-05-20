/* eslint-disable @typescript-eslint/no-explicit-any */

export function fetcher(fetch: any, url: RequestInfo, init?: RequestInit): any {
    const checkStatus = (response: Response): Response => {
        if(response.ok) return response
        else throw new Error('Not ok')
    }

    const parseJson = (response: Response): Promise<any> => response.json()  

    return fetch(url, init)
        .then(checkStatus)
        .then(parseJson)
}

/* eslint-enable @typescript-eslint/no-explicit-any */ 