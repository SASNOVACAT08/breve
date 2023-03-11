export const responseJson = <T>(status: number, body: T, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
  })
