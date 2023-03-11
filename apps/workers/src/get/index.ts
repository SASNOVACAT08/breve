import { responseJson } from '@utils/response'

interface Env {
  FILES: KVNamespace
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method === 'OPTIONS') return responseJson(200, { ok: true })
    if (request.method !== 'GET') return responseJson(405, { error: 'Method not allowed' })
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const metadataOnly = url.searchParams.get('metadata_only')
    if (!id) return responseJson(400, { error: 'Missing id' })
    const { value, metadata } = await env.FILES.getWithMetadata(id, { cacheTtl: 3600, type: 'arrayBuffer' })
    console.log('metadata', metadata, value)
    if (metadataOnly) return responseJson(200, { ...(metadata as object) })
    if (!value) return responseJson(404, { error: 'Not found' })
    const { type } = metadata as { type: string; name: string }
    return new Response(value, {
      status: 200,
      headers: { 'content-type': type },
    })
  },
}
