<template>
  <select :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)" :class="selectClass">
    <option v-if="defaultOption" :value="defaultOption.value">{{ defaultOption.text }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Option {
  value: string | number;
  text: string;
}

const props = defineProps<{
  modelValue: string;
  options: Option[];
  defaultOption?: Option;
  selectClass: string;
}>()

const emits = defineEmits(['update:modelValue'])
</script>