"use client"

import * as React from "react"

interface UseAsyncState<T> {
  value: T | null
  error: Error | null
  status: "idle" | "pending" | "success" | "error"
}

interface UseAsyncActions<T> {
  execute: (...args: any[]) => Promise<void>
  reset: () => void
}

/**
 * A hook for handling async operations
 * @param asyncFunction The async function to execute
 * @param immediate Whether to execute immediately
 * @returns State and actions for the async operation
 */
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false,
): [UseAsyncState<T>, UseAsyncActions<T>] {
  const [state, setState] = React.useState<UseAsyncState<T>>({
    value: null,
    error: null,
    status: "idle",
  })

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  const execute = React.useCallback(
    async (...args: any[]) => {
      setState({ value: null, error: null, status: "pending" })

      try {
        const response = await asyncFunction(...args)
        setState({ value: response, error: null, status: "success" })
      } catch (error) {
        setState({ value: null, error: error as Error, status: "error" })
      }
    },
    [asyncFunction],
  )

  // Call execute if immediate is true
  React.useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  const reset = React.useCallback(() => {
    setState({ value: null, error: null, status: "idle" })
  }, [])

  return [state, { execute, reset }]
}

