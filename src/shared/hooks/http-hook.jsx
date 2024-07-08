import { useCallback, useEffect, useRef, useState } from "react"

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true)
      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl)

      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        })
        const data = await res.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (ctrl) => ctrl !== httpAbortCtrl
        )

        if (!res.ok) throw new Error(data.message)

        return data
      } catch (error) {
        setError(error.message)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}
