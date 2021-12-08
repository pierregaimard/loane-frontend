<template>
  <nav
    class="
      w-full
      fixed
      h-24
      px-5
      text-white
      bg-gradient-to-r
      from-yellow-200
      via-fuschia-200
      to-pink-400
      grid grid-cols-3
      items-center
      shadow-lg
    "
  >
    <div
      class="
        app-brand
        text-pink-400
        text-4xl
        text-left
      "
    >
      La marchande de
      <strong class="font-bold text-pink-500 text-5xl">Loane</strong>
    </div>

    <div class="capitalize text-2xl text-center">
      Hello {{ username }}
    </div>

    <ul class="text-lg flex items-center justify-end">
      <li
        class="
          px-4
          py-1
          border border-transparent
          rounded-lg
          hover:border-white
        "
      >
        <router-link :to="{ name: 'Articles' }">
          Mes articles
        </router-link>
      </li>

      <li
        class="
          px-4 py-1
          border border-transparent
          rounded-lg
          hover:border-white
        "
      >
        <router-link :to="{ name: 'Home' }">
          Ma caisse
        </router-link>
      </li>

      <li
        class="
          px-4 py-1
          border border-transparent
          rounded-lg
          hover:border-white
        "
      >
        <button class="flex justify-center items-center">
          <LogoutIcon class="w-6 mr-1" /> Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { LogoutIcon } from '@heroicons/vue/solid'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LogoutIcon,
  },
  computed: {
    username(): string {
      return this.$store.getters.getUsername
    },
  },
})
</script>

<style lang="scss">
#app .app-brand {
  font-family: 'Meow Script', cursive;
}
</style>
