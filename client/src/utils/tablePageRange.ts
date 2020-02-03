const tablePageRange = (
  page: number,
  total: number,
  limit: number
): string | number => {
  if (total === 0) {
    return 0
  }
  const start = total >= 1 ? 1 : total
  const maxUsers = limit * page
  const toUser = maxUsers < total ? maxUsers : total
  const fromUser = page === 1 ? start : (page - 1) * limit + 1
  if (fromUser > total) {
    return 'page not exist'
  }
  return `${fromUser} - ${toUser}`
}
export default tablePageRange
