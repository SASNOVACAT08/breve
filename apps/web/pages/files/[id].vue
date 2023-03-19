<script setup lang="ts">
import { getFile } from '@gateway/files'

const router = useRouter()
const route = useRoute()

const state = reactive({
  isLoadingMetadata: true,
  timeBeforeDelete: 0,
})

const data = reactive({
  name: null,
  size: null,
  type: null,
  expiration: 0,
})

async function getMetadata() {
  const id = route.params.id
  if (!id) return
  try {
    const metadata = await getFile(id as string, true)
    data.name = metadata.name
    data.size = metadata.size
    data.type = metadata.type
    data.expiration = metadata.expiration
  } catch {
    router.push('/404')
  }
}

async function downloadFile() {
  const id = route.params.id
  if (!id) return
  const file = await getFile(id as string)
  const url = window.URL.createObjectURL(file)
  const a = document.createElement('a')
  document.body.append(a)
  a.href = url
  a.download = data.name as unknown as string
  a.click()
  window.URL.revokeObjectURL(url)
}

const hours = computed(() => {
  return Math.floor(state.timeBeforeDelete / 60 / 60)
})

const minutes = computed(() => {
  return Math.floor(state.timeBeforeDelete / 60) % 60
})

const seconds = computed(() => {
  return Math.floor(state.timeBeforeDelete % 60)
})

const size = computed(() => {
  const sizeFromData = data.size
  if (!sizeFromData) return '0 B'
  if (sizeFromData < 1024) return `${sizeFromData} B`
  if (sizeFromData < 1024 * 1024) return `${(sizeFromData / 1024).toFixed(2)} KB`
  if (sizeFromData < 1024 * 1024 * 1024) return `${(sizeFromData / 1024 / 1024).toFixed(2)} MB`
  return `${(sizeFromData / 1024 / 1024 / 1024).toFixed(2)} GB`
})

onMounted(async () => {
  await getMetadata()
  state.isLoadingMetadata = false
  const now = Date.now()
  const expiration = data.expiration
  state.timeBeforeDelete = Math.floor((expiration - now) / 1000)
  const interval = setInterval(() => {
    state.timeBeforeDelete--
    if (state.timeBeforeDelete <= 0) {
      clearInterval(interval)
    }
  }, 1000)
})
</script>

<template>
  <section class="flex flex-col items-center gap-5">
    <div v-if="!state.isLoadingMetadata" class="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
          <span :style="`--value: ${hours}`"></span>
        </span>
        hours
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
          <span :style="`--value: ${minutes}`"></span>
        </span>
        min
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
          <span :style="`--value: ${seconds}`"></span>
        </span>
        sec
      </div>
    </div>
    <section class="card w-full max-w-sm shadow-2xl bg-base-100">
      <article v-if="!state.isLoadingMetadata" class="card-body">
        <div class="flex justify-between flex-wrap gap-3">
          <span class="font-bold">{{ data.name }}</span>
          <span>{{ size }}</span>
        </div>
        <button class="btn btn-primary mt-5" @click="downloadFile">Download</button>
      </article>
      <article v-else class="card-body">
        <progress class="progress w-56"></progress>
      </article>
    </section>
  </section>
</template>
