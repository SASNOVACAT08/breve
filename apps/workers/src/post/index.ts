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
    if (file === null) return responseJson(400, { error: 'No file' })
    if (!(file instanceof File)) return responseJson(400, { error: 'Not a file' })
    const fileArrayBuffer = await file.arrayBuffer()
    console.log(file, file.name, file.type, file.size)
    const id = generateId()
    await env.FILES.put(id, fileArrayBuffer, {
      expirationTtl: 3600,
      metadata: {
        name: file.name,
        type: file.type,
        size: file.size,
        expiration: Date.now() + 3600,
      },
    })
    return responseJson(200, { id })
  },
}
