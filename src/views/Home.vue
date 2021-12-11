<template>
  <main
    class="
      flex
      justify-center
      items-center
      w-full
      h-full
    "
  >
    <router-link
      :to="{ name: 'Articles' }"
      class="
        p-5
        mx-5
        w-80
        border
        border-pink-500
        rounded-2xl
        shadow-lg
        hover:shadow-lg hover:transform hover:scale-105
        active:outline-none active:ring-4 active:ring-pink-200
        transition
        duration-150
        ease-in-out
      "
    >
      <CubeIcon class="text-pink-300" />
      <h2 class="text-2xl font-bold text-center mb-3">
        Mes articles
      </h2>
    </router-link>

    <router-link
      :to="{ name: 'Articles' }"
      class="
        p-5
        mx-5
        w-80
        border
        border-pink-500
        rounded-2xl
        shadow-lg
        hover:shadow-lg hover:transform hover:scale-105
        active:outline-none active:ring-4 active:ring-pink-200
        transition
        duration-150
        ease-in-out
      "
    >
      <CalculatorIcon class="text-pink-300" />
      <h2 class="text-2xl font-bold text-center mb-3">
        Ma caisse
      </h2>
    </router-link>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CubeIcon, CalculatorIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    CubeIcon,
    CalculatorIcon,
  },
})
</script>
