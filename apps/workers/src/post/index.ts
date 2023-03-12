import { generateId } from '@utils/generate'
import { responseJson } from '@utils/response'

interface Env {
  FILES: KVNamespace
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method !== 'POST') return responseJson(405, { error: 'Method not allowed' })
    const body = await request.formData()
    const file = body.get('file') as unknown
    const expiration = body.get('expiration')
    if (file === null) return responseJson(400, { error: 'No file' })
    if (!(file instanceof File)) return responseJson(400, { error: 'Not a file' })
    if (file.size > 1024 * 1024 * 2) return responseJson(400, { error: 'File too large' })
    const fileArrayBuffer = await file.arrayBuffer()
    console.log(file, file.name, file.type, file.size)
    const id = generateId()
    const expirationTime = [60, 120, 180].includes(Number(expiration)) ? Number(expiration) : 60
    await env.FILES.put(id, fileArrayBuffer, {
      expirationTtl: expirationTime * 60,
      metadata: {
        name: file.name,
        type: file.type,
        size: file.size,
        expiration: Date.now() + expirationTime * 60 * 1000,
      },
    })
    return responseJson(200, { id })
  },
}
