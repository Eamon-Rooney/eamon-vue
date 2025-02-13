<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    :class="inputClass"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  inputClass: String
})

const emits = defineEmits(['update:modelValue'])
</script>