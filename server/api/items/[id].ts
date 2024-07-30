export default defineEventHandler(async (event) => {
  const id = event.context.params!.id
  // 模拟数据库查询
  return { id: Number(id), title: `Item ${id}`, description: `Description for item ${id}` }
})