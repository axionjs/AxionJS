"use client"

import * as React from "react"

interface UseVirtualListOptions {
  itemHeight: number
  overscan?: number
}

interface UseVirtualListReturn<T> {
  virtualItems: Array<{
    index: number
    start: number
    end: number
    item: T
  }>
  totalHeight: number
  scrollToIndex: (index: number) => void
}

/**
 * A hook for virtualizing long lists
 * @param items The list items
 * @param options Configuration options
 * @returns Virtual list state and actions
 */
export function useVirtualList<T>(
  items: T[],
  { itemHeight, overscan = 3 }: UseVirtualListOptions,
): UseVirtualListReturn<T> {
  const [scrollTop, setScrollTop] = React.useState(0)
  const [containerHeight, setContainerHeight] = React.useState(0)
  const containerRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect
      setContainerHeight(height)
    })

    resizeObserver.observe(container)

    const handleScroll = () => {
      setScrollTop(container.scrollTop)
    }

    container.addEventListener("scroll", handleScroll)
    setContainerHeight(container.clientHeight)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      resizeObserver.disconnect()
    }
  }, [])

  const totalHeight = items.length * itemHeight

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + overscan)

  const virtualItems = React.useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => {
      const virtualIndex = startIndex + index
      return {
        index: virtualIndex,
        start: virtualIndex * itemHeight,
        end: (virtualIndex + 1) * itemHeight,
        item,
      }
    })
  }, [startIndex, endIndex, items, itemHeight])

  const scrollToIndex = React.useCallback(
    (index: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTop = index * itemHeight
      }
    },
    [itemHeight],
  )

  return {
    virtualItems,
    totalHeight,
    scrollToIndex,
  }
}

