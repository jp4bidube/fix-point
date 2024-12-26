export enum HttpMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export type HttpRequest<TBody = unknown> = {
	endpoint: string
	method: HttpMethod
	body?: TBody
	headers?: Record<string, string | number>
	params?: Record<string, string | number>
}

export interface IHttpClient {
	sendRequest: <TResponse, TBody = unknown>(
		request: HttpRequest<TBody>,
	) => Promise<TResponse>
}
