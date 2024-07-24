export const usePagination = () => {
  const currentPage = ref(1)
  const totalPages = ref(1)

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const setTotalPages = (total: number) => {
    totalPages.value = total
  }

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages
  }
}