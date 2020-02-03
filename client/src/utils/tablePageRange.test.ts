import tablePageRange from './tablePageRange'

test('page: 1, total: 0, limit: 100 should be 0', () => {
  expect(tablePageRange(1, 0, 100)).toBe(0)
})

test('page: 1, total: 41, limit: 10 should be 1 - 10', () => {
  expect(tablePageRange(1, 41, 10)).toBe('1 - 10')
})

test('page: 2, total: 41, limit: 10 should be 21 - 40', () => {
  expect(tablePageRange(2, 41, 20)).toBe('21 - 40')
})

test('page: 2, total: 41, limit: 100 should be page not exist', () => {
  expect(tablePageRange(3, 41, 100)).toBe('page not exist')
})
