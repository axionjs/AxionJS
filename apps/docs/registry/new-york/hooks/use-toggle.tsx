"use client"

import * as React from "react"

/**
 * A hook that provides toggle functionality
 * @param initialValue The initial state
 * @returns The current state and toggle function
 */
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = React.useState(initialValue)

  const toggle = React.useCallback(() => {
    setValue((v) => !v)
  }, [])

  return [value, toggle]
}

