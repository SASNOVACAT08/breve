import { responseJson } from '@utils/response'

interface Env {
  Blob: KVNamespace
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method === 'OPTIONS')
      return responseJson(
        200,
        { ok: true },
        {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
      )
    if (request.method !== 'GET') return responseJson(405, { error: 'Method not allowed' })
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const metadataOnly = url.searchParams.get('metadata_only')
    if (!id) return responseJson(400, { error: 'Missing id' })
    const { value, metadata } = await env.Blob.getWithMetadata(id, { cacheTtl: 3600, type: 'arrayBuffer' })
    if (!value) return responseJson(404, { error: 'Not found' })
    if (metadataOnly) return responseJson(200, { ...(metadata as object) })
    const { type } = metadata as { type: string; name: string }
    return new Response(value, {
      status: 200,
      headers: {
        'content-type': type,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    })
  },
}
