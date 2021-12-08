<template>
  <Navbar />

  <p>
    <router-link :to="{ name: 'Logout' }">
      Logout
    </router-link>
  </p>
</template>

<script lang="ts">
import Navbar from '../components/nav/Navbar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Navbar,
  },
  computed: {
    username() {
      return this.$store.getters.getUsername
    },
  },
})
</script>
