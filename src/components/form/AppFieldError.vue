<template>
  <p
    v-if="error"
    :aria-invalid="error ? true : null"
    :class="elmClass"
    v-bind="attrs"
  >
    {{ error }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    error: {
      type: String,
      default: '',
    },
    attrs: {
      type: Object,
      default: null,
    },
  },
  computed: {
    elmClass(): string {
      return this.attrs !== null
        ? ''
        : 'text-center text-white mt-2 p-1 rounded-full bg-pink-600'
    },
  },
})
</script>
