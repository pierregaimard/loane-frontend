<template>
  <component
    :is="icon"
    v-bind="$attrs"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { GiftIcon, DesktopComputerIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    GiftIcon,
    DesktopComputerIcon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
})
</script>
