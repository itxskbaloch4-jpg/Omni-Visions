import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Hybrid hook: tries API first, falls back to static data.
 * Components pass their static data as fallback.
 */
export const usePageData = (slug, staticData = null) => {
  const [data, setData] = useState(staticData)
  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await api.get(`/pages/${slug}`)
        if (res.success && res.data) {
          setData(res.data)
          setIsLive(true)
        }
      } catch {
        setIsLive(false)
      } finally {
        setLoading(false)
      }
    }
    fetchPage()
  }, [slug])

  return { data, isLive, loading }
}
