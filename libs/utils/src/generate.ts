export const generateId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'
  let id = ''
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}
