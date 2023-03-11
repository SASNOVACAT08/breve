<script setup lang="ts">
const data = reactive({
  id: null,
})
</script>

<template>
  <section class="flex-shrink-0">
    <article>
      <NuxtLink class="btn btn-primary w-full" to="/upload">Upload</NuxtLink>
    </article>
    <div class="divider">Or</div>
    <article class="flex gap-2">
      <input v-model="data.id" type="text" class="input input-bordered" placeholder="Enter your code" />
      <NuxtLink :to="`/${data.id}`" class="btn btn-primary">Access</NuxtLink>
    </article>
  </section>
</template>
