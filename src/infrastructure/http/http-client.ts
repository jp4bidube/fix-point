import axios, { AxiosError, AxiosInstance } from "axios";
import { IHttpClient, HttpRequest } from "../contracts/http-contracts";

const baseURL = "http://localhost:3333";

export class HttpClient implements IHttpClient {
  constructor(private api: AxiosInstance) {}

  static create(): HttpClient {
    return new HttpClient(axios);
  }

  async sendRequest<TResponse, TBody>(
    props: HttpRequest<TBody>
  ): Promise<TResponse> {
    const { endpoint, method, body, headers, params } = props;
    try {
      const { data } = await this.api.request<TResponse>({
        method,
        headers,
        data: body,
        url: `${baseURL}${endpoint}`,
        params,
      });
      return data;
    } catch (er) {
      const error = er as AxiosError;
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message;
      throw new Error(`Request failed with status ${status}: ${message}`);
    }
  }
}
