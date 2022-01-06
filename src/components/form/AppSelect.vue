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
    <select
      :id="uuid"
      v-model="value"
      class="app-field block"
      v-bind="$attrs"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
      :class="inputStyle"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
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
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    labelAttrs: {
      type: Object,
      default: null,
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
  emits: { 'update:modelValue': null },
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
