"use client"

import * as React from "react"

/**
 * A hook that returns true if the media query matches
 * @param query The media query to match
 * @returns Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)
    const updateMatch = () => setMatches(media.matches)

    // Set initial value
    updateMatch()

    // Listen for changes
    media.addEventListener("change", updateMatch)

    return () => media.removeEventListener("change", updateMatch)
  }, [query])

  return matches
}

