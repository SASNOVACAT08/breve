import { fileURLToPath } from 'url'

import en from '../../libs/i18n/src/en.json'
import fr from '../../libs/i18n/src/fr.json'

const gateway = fileURLToPath(new URL('../../libs/gateway/src', import.meta.url))
const i18n = fileURLToPath(new URL('../../libs/i18n/src', import.meta.url))
const shared = fileURLToPath(new URL('../../libs/shared/src', import.meta.url))
const utils = fileURLToPath(new URL('../../libs/utils/src', import.meta.url))

export default defineNuxtConfig({
  alias: {
    '@gateway': gateway,
    '@i18n': i18n,
    '@shared': shared,
    '@utils': utils,
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/i18n'],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: {
        en,
        fr,
      },
    },
  },
})
