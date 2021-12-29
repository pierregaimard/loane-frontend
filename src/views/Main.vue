<template>
  <Navbar />

  <router-view class="py-40 px-6" />
</template>

<script lang="ts">
import Navbar from '../components/nav/Navbar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Navbar,
  },
})
</script>
