import { workers } from './wrapper'

export const getFile = async (id: string, onlyMetadata = false) => {
  const url = onlyMetadata
    ? `https://get.sasnovacat08.workers.dev/?id=${id}&metadata_only=true`
    : `https://get.sasnovacat08.workers.dev/?id=${id}`
  const response = await workers.get(url)
  return onlyMetadata ? response.json() : response.blob()
}

export const postFile = async (file: File, duration: number) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('expiration', duration.toString())
  const response = await workers.postFornData('https://upload.sasnovacat08.workers.dev', formData)
  return response.json()
}
