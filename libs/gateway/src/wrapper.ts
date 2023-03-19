class Wrapper {
  baseUri: string

  constructor(baseUri: string) {
    this.baseUri = baseUri
  }

  async get(path: string, headers?: Record<string, string>) {
    let uri = ''
    if (path.includes('https://') || path.includes('http://')) {
      uri = path
    } else {
      uri = `${this.baseUri}${path}`
    }
    return fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  }

  async post<T>(path: string, body: T, headers?: Record<string, string>) {
    let uri = ''
    if (path.includes('https://') || path.includes('http://')) {
      uri = path
    } else {
      uri = `${this.baseUri}${path}`
    }
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    })
  }

  async postFornData(path: string, body: FormData, headers?: Record<string, string>) {
    let uri = ''
    if (path.includes('https://') || path.includes('http://')) {
      uri = path
    } else {
      uri = `${this.baseUri}${path}`
    }
    return fetch(uri, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body,
    })
  }

  async put<T>(path: string, body: T, headers?: Record<string, string>) {
    return fetch(`${this.baseUri}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    })
  }

  async delete<T>(path: string, body: T, headers?: Record<string, string>) {
    return fetch(`${this.baseUri}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      ...headers,
      body: JSON.stringify(body),
    })
  }
}

const { BREVE_WORKERS_BASE_URL = 'http://localhost:8787' } = import.meta.env

const workers = new Wrapper(`${BREVE_WORKERS_BASE_URL}`)

export { workers }
