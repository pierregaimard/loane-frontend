<template>
  <component
    :is="inline ? 'span' : 'div'"
    v-bind="blockAttrs"
  >
    <label
      :for="uuid"
      v-bind="labelAttrs"
      :class="inline ? null : 'block mb-1'"
    >
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      :id="uuid"
      v-model="value"
      :type="type"
      :aria-describedby="error ? errorId : null"
      :aria-invalid="error ? true : null"
      :placeholder="label"
      :class="inputStyle"
    >
    <AppFieldError
      :id="errorId"
      :error="error"
      :attr="errorAttrs"
    />
  </component>
</template>

<script lang="ts">
import UniqueID from '../../services/form/UniqueID'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
    },
    labelAttrs: {
      type: Object,
      default: null,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    errorAttrs: {
      type: Object,
      default: null,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    blockAttrs: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const uuid = UniqueID().getID()

    return {
      uuid,
    }
  },
  data: function () {
    return {
      errorMessageStyle: {
        'text-red-600': true,
      },
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: [string, number]) {
        this.$emit('update:modelValue', value)
      },
    },
    errorId() {
      return `${this.uuid}-error`
    },
    inputStyle() {
      const baseStyle = 'py-2 px-4 rounded-xl focus:ring-4 focus:shadow-lg'
      const errorStyle =
        'text-red-700 placeholder-red-500 border border-red-500 focus:border-red-500 focus:ring-red-300'
      const validStyle =
        'text-pink-700 placeholder-pink-300 border-none focus:ring-pink-100'

      return this.error
        ? `${baseStyle} ${errorStyle}`
        : `${baseStyle} ${validStyle}`
    },
  },
})
</script>
