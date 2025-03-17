"use client"

import * as React from "react"

interface UsePaginationProps {
  totalItems: number
  initialPage?: number
  pageSize?: number
  siblingCount?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  pageItems: number[]
  firstPage: () => void
  previousPage: () => void
  nextPage: () => void
  lastPage: () => void
  goToPage: (page: number) => void
  canPreviousPage: boolean
  canNextPage: boolean
}

/**
 * A hook for pagination
 * @param props Pagination configuration
 * @returns Pagination state and actions
 */
export function usePagination({
  totalItems,
  initialPage = 1,
  pageSize = 10,
  siblingCount = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = React.useState(initialPage)

  const totalPages = Math.ceil(totalItems / pageSize)

  // Reset current page if total pages changes
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1)
    }
  }, [currentPage, totalPages])

  // Generate page items array with ellipsis
  const pageItems = React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 3 // siblings + first + current + last

    // If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)

      return [...leftRange, -1, totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)

      return [1, -1, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      )

      return [1, -1, ...middleRange, -1, totalPages]
    }

    return []
  }, [currentPage, siblingCount, totalPages])

  const canPreviousPage = currentPage > 1
  const canNextPage = currentPage < totalPages

  const firstPage = React.useCallback(() => setCurrentPage(1), [])
  const previousPage = React.useCallback(() => setCurrentPage((page) => Math.max(page - 1, 1)), [])
  const nextPage = React.useCallback(() => setCurrentPage((page) => Math.min(page + 1, totalPages)), [totalPages])
  const lastPage = React.useCallback(() => setCurrentPage(totalPages), [totalPages])
  const goToPage = React.useCallback(
    (page: number) => setCurrentPage(Math.min(Math.max(page, 1), totalPages)),
    [totalPages],
  )

  return {
    currentPage,
    totalPages,
    pageItems,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    goToPage,
    canPreviousPage,
    canNextPage,
  }
}

