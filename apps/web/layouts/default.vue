<script setup lang="ts">
</script>

<template>
  <main class="flex flex-col h-screen">
    <main class="flex-1 hero h-full bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        <slot />
      </div>
    </main>
    <breve-footer />
  </main>
</template>