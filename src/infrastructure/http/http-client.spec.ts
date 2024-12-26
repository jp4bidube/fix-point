import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { HttpClient } from './http-client'
import { HttpMethod, HttpRequest } from '../contracts/http-contracts'

describe('HttpClient', () => {
	const httpClient = HttpClient.create()

	it('should make a successful GET request and return data', async () => {
		const mockResponse = { data: 'Test data' }
		vi.spyOn(axios, 'request').mockResolvedValueOnce({ data: mockResponse })

		const request: HttpRequest<null> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.GET,
			body: null,
			headers: { 'Content-Type': 'application/json' },
		}

		const result = await httpClient.sendRequest<typeof mockResponse, null>(request)

		expect(result).toEqual(mockResponse)
		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: { 'Content-Type': 'application/json' },
			data: null,
			url: 'http://localhost:3000/test-endpoint',
			params: undefined,
		})
	})

	it('should throw an error when request fails', async () => {
		vi.spyOn(axios, 'request').mockRejectedValueOnce({
			response: {
				status: 400,
				data: { error: 'Bad Request' },
			},
			message: 'Request failed',
		})

		const request: HttpRequest<null> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.GET,
			body: null,
			headers: { 'Content-Type': 'application/json' },
		}

		await expect(httpClient.sendRequest<null, null>(request)).rejects.toThrow(
			'Request failed with status 400: [object Object]',
		)

		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: { 'Content-Type': 'application/json' },
			data: null,
			url: 'http://localhost:3000/test-endpoint',
			params: undefined,
		})
	})

	it('should throw a generic error when an unknown error occurs', async () => {
		// Simula um erro que não é um AxiosError
		vi.spyOn(axios, 'request').mockRejectedValueOnce(new Error('Unknown error'))

		const request: HttpRequest<null> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.GET,
			body: null,
			headers: { 'Content-Type': 'application/json' },
		}

		await expect(httpClient.sendRequest<null, null>(request)).rejects.toThrow(
			'Request failed with status 500: Unknown error',
		)

		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: { 'Content-Type': 'application/json' },
			data: null,
			url: 'http://localhost:3000/test-endpoint',
			params: undefined,
		})
	})

	it('should make a successful POST request and return data', async () => {
		const mockResponse = { data: 'Post data' }
		vi.spyOn(axios, 'request').mockResolvedValueOnce({ data: mockResponse })

		const request: HttpRequest<{ name: string }> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.POST,
			body: { name: 'Test' },
			headers: { 'Content-Type': 'application/json' },
		}

		const result = await httpClient.sendRequest<typeof mockResponse, { name: string }>(
			request,
		)

		expect(result).toEqual(mockResponse)
		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.POST,
			headers: { 'Content-Type': 'application/json' },
			data: { name: 'Test' },
			url: 'http://localhost:3000/test-endpoint',
			params: undefined,
		})
	})

	it('should make a successful GET request with query parameters', async () => {
		const mockResponse = { data: 'Query data' }
		vi.spyOn(axios, 'request').mockResolvedValueOnce({ data: mockResponse })

		const request: HttpRequest<null> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.GET,
			body: null,
			headers: { 'Content-Type': 'application/json' },
			params: { search: 'query', page: 1 },
		}

		const result = await httpClient.sendRequest<typeof mockResponse, null>(request)

		expect(result).toEqual(mockResponse)
		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: { 'Content-Type': 'application/json' },
			data: null,
			url: 'http://localhost:3000/test-endpoint',
			params: { search: 'query', page: 1 },
		})
	})

	it('should throw an error when POST request fails', async () => {
		vi.spyOn(axios, 'request').mockRejectedValueOnce({
			response: {
				status: 500,
				data: { error: 'Internal Server Error' },
			},
			message: 'Request failed',
		})

		const request: HttpRequest<{ name: string }> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.POST,
			body: { name: 'Test' },
			headers: { 'Content-Type': 'application/json' },
		}

		await expect(
			httpClient.sendRequest<{ error: string }, { name: string }>(request),
		).rejects.toThrow('Request failed with status 500: [object Object]')

		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.POST,
			headers: { 'Content-Type': 'application/json' },
			data: { name: 'Test' },
			url: 'http://localhost:3000/test-endpoint',
			params: undefined,
		})
	})

	it('should make a successful GET request with custom headers', async () => {
		const mockResponse = { data: 'Custom headers data' }
		vi.spyOn(axios, 'request').mockResolvedValueOnce({ data: mockResponse })

		const request: HttpRequest<null> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.GET,
			body: null,
			headers: { Authorization: 'Bearer token' },
		}

		const result = await httpClient.sendRequest<typeof mockResponse, null>(request)

		expect(result).toEqual(mockResponse)
		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: { Authorization: 'Bearer token' },
			data: null,
			url: 'http://localhost:3000/test-endpoint',
			params: undefined,
		})
	})

	it('should handle requests with empty body', async () => {
		const mockResponse = { data: 'Empty body response' }
		vi.spyOn(axios, 'request').mockResolvedValueOnce({ data: mockResponse })

		const request: HttpRequest<null> = {
			endpoint: '/test-endpoint',
			method: HttpMethod.POST,
			body: null,
			headers: { 'Content-Type': 'application/json' },
		}

		const result = await httpClient.sendRequest<typeof mockResponse, null>(request)

		expect(result).toEqual(mockResponse)
		expect(axios.request).toHaveBeenCalledWith({
			method: HttpMethod.POST,
			headers: { 'Content-Type': 'application/json' },
			data: null,
			url: 'http://localhost:3000/test-endpoint',
			params: undefined,
		})
	})
})
