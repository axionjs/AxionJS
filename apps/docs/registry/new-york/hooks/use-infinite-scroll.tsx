"use client"

import * as React from "react"

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

/**
 * A hook for implementing infinite scrolling
 * @param callback Function to call when the bottom is reached
 * @param options Configuration options
 * @returns A ref to attach to the scrollable element
 */
export function useInfiniteScroll(
  callback: () => void,
  { threshold = 0.8, rootMargin = "0px", enabled = true }: UseInfiniteScrollOptions = {},
): React.RefObject<HTMLElement> {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          callback()
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [callback, rootMargin, threshold, enabled])

  return ref
}

