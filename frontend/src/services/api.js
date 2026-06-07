const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const TIMEOUT = 5000

class ApiService {
  constructor() {
    this.isAvailable = null
    this.checkInterval = null
  }

  getToken() {
    return localStorage.getItem('ov_admin_token')
  }

  async request(endpoint, options = {}) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(this.getToken() && { Authorization: `Bearer ${this.getToken()}` }),
          ...options.headers,
        },
      })
      clearTimeout(timeoutId)
      this.isAvailable = true

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(error.message || `HTTP ${res.status}`)
      }
      return res.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError' || error.message.includes('fetch')) {
        this.isAvailable = false
      }
      throw error
    }
  }

  async checkHealth() {
    try {
      await this.request('/health')
      this.isAvailable = true
      return true
    } catch {
      this.isAvailable = false
      return false
    }
  }

  get(endpoint) { return this.request(endpoint) }
  post(endpoint, data) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }) }
  put(endpoint, data) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }) }
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }) }
}

export const api = new ApiService()
export default api
