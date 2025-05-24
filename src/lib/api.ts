import { API_BASE_URL } from './config'

type QueryParams = Record<string, string | number | boolean | undefined>

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `Erro ${response.status}`)
  }

  return response.json() as Promise<T>
}

function buildUrl(path: string, queryParams?: QueryParams): string {
  const url = new URL(`${API_BASE_URL}${path}`)

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, String(value))
      }
    })
  }

  return url.toString()
}

export const apiClient = {
  get: async <T>(
    path: string,
    options?: {
      queryParams?: QueryParams
      config?: RequestInit
    }
  ): Promise<T> => {
    const url = buildUrl(path, options?.queryParams)
    const response = await fetch(url, {
      method: 'GET',
      ...options?.config
    })

    return handleResponse<T>(response)
  },

  post: async <T>(
    path: string,
    body: unknown,
    config?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...config
    })
    return handleResponse<T>(response)
  },

  put: async <T>(
    path: string,
    body: unknown,
    config?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...config
    })
    return handleResponse<T>(response)
  },

  delete: async <T>(path: string, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      ...config
    })
    return handleResponse<T>(response)
  }
}
