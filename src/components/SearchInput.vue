<template>
  <div class="search-input-container">
    <input
      type="text"
      v-model="inputValue"
      :placeholder="placeholder"
      :class="inputClass"
    />
    <svg class="search-icon" @click="handleSearchClick" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C11.85 18 13.55 17.35 14.88 16.24L19.29 20.65C19.68 21.04 20.31 21.04 20.7 20.65C21.09 20.26 21.09 19.63 20.7 19.24L16.29 14.83C17.35 13.55 18 11.85 18 10C18 5.58 14.42 2 10 2ZM10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4Z" fill="black"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  inputClass: String,
  onSearch: Function
})

const emits = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

const handleSearchClick = () => {
  emits('update:modelValue', inputValue.value)
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
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

input {
  width: 100%;
  padding: 0.5rem;
  padding-right: 30px; /* Add padding to the right to make space for the icon */
  font-size: 1rem;
  text-align: center; /* Center the text */
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>