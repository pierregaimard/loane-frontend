<template>
  <main class="px-10">
    <div class="flex justify-end">
      <router-link
        :to="{ name: 'Home' }"
        class="
          flex items-center
          font-bold text-pink-300
          px-2 py-1
          rounded-lg
          bg-white
          border-2
          border-pink-200
          ring-4 ring-pink-100
          transform ease-in-out duration-100 hover:scale-105
        "
      >
        <PlusCircleIcon class="w-8 h-8 mr-1"/>
        Ajouter un article
      </router-link>
    </div>
    <h1 class="text-pink-400 text-5xl text-center mt-6">Mes articles</h1>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PlusCircleIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    PlusCircleIcon,
  },
})
</script>

<style lang="scss">
h1 {
  font-family: 'Leckerli One', cursive;
}
</style>
