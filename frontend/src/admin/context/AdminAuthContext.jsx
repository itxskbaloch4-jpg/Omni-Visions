import { createContext, useContext, useState, useEffect } from 'react'
import api from '../../services/api'

const AdminAuthContext = createContext(null)

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('ov_admin_token')
    if (token) {
      api.get('/auth/me')
        .then(res => { if (res.success) setAdmin(res.data) })
        .catch(() => localStorage.removeItem('ov_admin_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    if (res.success) {
      localStorage.setItem('ov_admin_token', res.token)
      setAdmin(res.data)
    }
    return res
  }

  const logout = () => {
    localStorage.removeItem('ov_admin_token')
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
