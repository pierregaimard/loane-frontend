<template>
  <label :for="uuid">{{ label }}</label>
  <select
    :id="uuid"
    v-model="value"
    class="app-field"
    v-bind="$attrs"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : null"
  >
    <option
      v-for="option in options"
      :key="option.value"
    >
      {{ option.label }}
    </option>
  </select>
  <p
    v-if="error"
    :id="`${uuid}-error`"
    class="app-field-error"
  >
    {{ error }}
  </p>
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
  },
  emits: { 'update:modelValue': null },
  setup() {
    const uuid = UniqueID().getID()

    return {
      uuid,
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
  },
})
</script>
