import { showError } from "#app";
import axios, { type AxiosError, type AxiosResponse } from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

function handleApiError(error: AxiosError) {
  const status = error.response?.status;

  if (!status || ![401, 403, 404, 500].includes(status)) {
    return;
  }

  console.error(`API error ${status}`);

  if (import.meta.client) {
    showError({
      status,
      statusText: `API error ${status}`,
    });
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    handleApiError(error);

    return Promise.reject(error);
  },
);

export async function mapToDataOnly<TResponse>(
  request: Promise<AxiosResponse<TResponse>>,
): Promise<TResponse> {
  const response = await request;

  return response.data;
}
