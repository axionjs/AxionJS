"use client"

import * as React from "react"

interface ScrollPosition {
  x: number
  y: number
}

/**
 * A hook that tracks the scroll position
 * @param element The element to track (defaults to window)
 * @returns The current scroll position
 */
export function useScrollPosition(element?: React.RefObject<HTMLElement>): ScrollPosition {
  const [scrollPosition, setScrollPosition] = React.useState<ScrollPosition>({ x: 0, y: 0 })

  const updateScrollPosition = React.useCallback(() => {
    if (typeof window === "undefined") return

    if (element?.current) {
      setScrollPosition({
        x: element.current.scrollLeft,
        y: element.current.scrollTop,
      })
    } else {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      })
    }
  }, [element])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const target = element?.current ?? window

    target.addEventListener("scroll", updateScrollPosition, { passive: true })
    updateScrollPosition()

    return () => target.removeEventListener("scroll", updateScrollPosition)
  }, [element, updateScrollPosition])

  return scrollPosition
}

