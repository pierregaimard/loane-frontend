<template>
  <nav
    class="
      w-full
      p-5
      fixed
      top-0
      bg-white
    "
  >
    <div
      class="
        w-full
        pl-5 pr-4 md:pr-8
        text-white
        bg-gradient-to-r
        from-pink-300
        to-pink-400
        flex
        justify-between
        items-center
        rounded-2xl
        shadow
      "
    >
      <div class="flex justify-between items-center space-x-6 py-4 md:w-full lg:w-auto">
        <!-- Brand -->
        <div>
          <router-link
            :to="{ name: 'Home' }"
            class="
              text-4xl
              app-brand
              text-center
            "
          >
            <div
              class="
                px-4 md:px-6 py-1
                bg-white bg-opacity-10
                rounded-xl
                border border-pink-200
                shadow-sm
                transform
                -rotate-3
              "
            >
              <div class="text-green-100">
                La marchande de
              </div>
              <div class="font-bold text-5xl text-yellow-200 -mt-4 mr-8">
                Loane
              </div>
            </div>
          </router-link>
        </div>

        <!-- Primary menu -->
        <div class="hidden md:flex space-x-5 items-center">
          <router-link
            :to="{ name: 'Articles' }"
            class="flex text-lg font-bold text-white hover:text-green-100 transition ease-in-out"
          >
            <CubeIcon class="h-6 w-6 mr-1" />
            Mes articles
          </router-link>

          <router-link
            :to="{ name: 'Articles' }"
            class="flex text-lg font-bold text-white hover:text-green-100 transition ease-in-out"
          >
            <CalculatorIcon class="h-6 w-6 mr-1" />
            Ma caisse
          </router-link>
        </div>
      </div>

      <!-- Secondary menu -->
      <ul class="hidden lg:flex text-lg space-x-5 items-center justify-end">
        <li>
          <button
            class="
              bg-white
              text-pink-400
              shadow-md
              rounded-lg
              px-4 py-1
              flex
              justify-center
              items-center
              transition
              ease-in-out
              hover:transform
              hover:scale-105
              duration-150
              active:outline-none
              active:ring-4
              active:ring-pink-200
            "
          >
            <LogoutIcon class="w-6 mr-1" /> Logout
          </button>
        </li>

        <li class="flex capitalize text-lg text-center">
          Hello {{ username }}
        </li>
      </ul>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button @click="displayMobileMenu = !displayMobileMenu">
          <MenuIcon class="w-8 h-8" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="displayMobileMenu"
      class="mt-3 p-3 rounded-xl transform transition-opacity duration-100 ease-in shadow"
      :class="displayMobileMenu ? 'opacity-100' : 'opacity-0'"
    >
      <router-link
        :to="{ name: 'Home' }"
        class="block px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-500"
        @click="displayMobileMenu = false"
      >
        Mes articles
      </router-link>
      <router-link
        :to="{ name: 'Articles' }"
        class="
          block
          px-4 py-2
          bg-pink-100 hover:bg-pink-200
          text-pink-500
          rounded-b-lg
        "
        @click="displayMobileMenu = false"
      >
        Ma caisse
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { LogoutIcon, CubeIcon, CalculatorIcon, MenuIcon } from '@heroicons/vue/outline'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LogoutIcon,
    CubeIcon,
    CalculatorIcon,
    MenuIcon,
  },
  data() {
    return {
      displayMobileMenu: false,
    }
  },
  computed: {
    username(): string {
      return this.$store.getters.getUsername
    },
  },
})
</script>

<style>
#app .app-brand {
  font-family: 'Meow Script', cursive;
}
</style>
