<template>
  <div class="search-input-container">
    <input
      type="text"
      :value="modelValue"
      @change="updateValue"
      :placeholder="placeholder"
      :class="inputClass"
    />
    <span class="search-icon" @click="handleSearchClick">🔍</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  inputClass: String,
  onSearch: Function
})

const emits = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}

const handleSearchClick = () => {
  if (props.onSearch) {
    props.onSearch()
  }
}
</script>

<style scoped>
.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>