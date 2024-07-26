export default defineEventHandler(async (event) => {
  const users = [
    {
      id: 0,
      name: 'Item 1'
    }, {
      id: 1,
      name: 'Item 2'
    }, {
      id: 2,
      name: 'Item 3'
    }, {
      id: 3,
      name: 'Item 4'
    },
  ]
  return {
    status: 200,
    data: users
  }
})
