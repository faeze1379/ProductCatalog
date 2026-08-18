import axios, { type AxiosResponse } from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function mapToDataOnly<TResponse>(
  request: Promise<AxiosResponse<TResponse>>,
): Promise<TResponse> {
  const response = await request;

  return response.data;
}
