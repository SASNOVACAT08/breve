<script setup lang="ts">
function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <section
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 justify-center items-center"
  >
    <h1 class="text-5xl">404</h1>
    <button class="btn btn-primary" @click="handleError">Go back</button>
  </section>
</template>
