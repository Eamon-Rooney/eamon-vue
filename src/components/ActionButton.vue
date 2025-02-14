<template>
  <button @click="handleClick" :class="buttonClass">{{ buttonText }}</button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  buttonText: String,
  buttonClass: [String, Object], // Accept both string and object
  onClick: Function
})

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>