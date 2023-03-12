<script setup lang="ts">
import { postFile } from '@gateway/files'

const state = reactive({
  isCopied: false,
  isUploading: false,
  needToUploadAFile: false,
})

const data = reactive({
  file: null,
  duration: 60,
  id: null,
})

function uploadFile(event: any) {
  const file = event.target.files[0]
  const size = file.size
  if (size > 2 * 1024 * 1024) {
    alert('File is too big!')
    event.target.value = ''
    return
  }

  data.file = event.target.files[0]
}

async function upload() {
  if (!data.file) return needToChooseAFile()
  state.isUploading = true
  const fileContent = await postFile(data.file, data.duration)
  state.isUploading = false
  data.id = fileContent.id
}

async function copyToClipboard() {
  if (!data.id) return
  await navigator.clipboard.writeText(data.id)
  state.isCopied = true
  setTimeout(() => {
    state.isCopied = false
  }, 2000)
}

function needToChooseAFile() {
  state.needToUploadAFile = true
  setTimeout(() => {
    state.needToUploadAFile = false
  }, 2000)
}

const copied = computed(() => {
  return state.isCopied ? 'Copied!' : 'Copy'
})
</script>

<template>
  <section class="card w-full max-w-sm shadow-2xl bg-base-100">
    <Transition name="fade">
      <div
        v-if="state.needToUploadAFile"
        class="fixed top-5 left-1/2 -translate-x-1/2 w-fit alert alert-warning shadow-lg"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>You need to upload a file!</span>
        </div>
      </div>
    </Transition>
    <article class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">File</span>
        </label>
        <input
          type="file"
          class="file-input file-input-bordered file-input-primary w-full max-w-xs"
          @change="uploadFile"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Duration</span>
          <span class="label-text">{{ data.duration }} minutes</span>
        </label>
        <input v-model="data.duration" type="range" min="60" max="180" class="range" step="60" />
        <div class="w-full flex justify-between text-xs px-2">
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>
      <div class="card-actions justify-center mt-4">
        <button class="btn btn-primary" @click="upload">Upload</button>
      </div>
      <progress v-if="state.isUploading" class="progress progress-primary mt-5"></progress>
      <div v-if="data.id && !state.isUploading" class="tooltip tooltip-bottom mt-5" :data-tip="copied">
        <button class="btn" @click="copyToClipboard">{{ data.id }}</button>
      </div>
    </article>
  </section>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
