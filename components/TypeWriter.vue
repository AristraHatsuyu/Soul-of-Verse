<template>
    <span>{{ displayedText }}</span>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  
  const props = defineProps({
    text: String,
    speed: {
      type: Number,
      default: 50
    }
  })
  
  const displayedText = ref('')
  let index = 0
  
  watchEffect(() => {
    displayedText.value = ''
    index = 0
    const interval = setInterval(() => {
      if (index < props.text.length) {
        displayedText.value += props.text[index]
        index++
      } else {
        clearInterval(interval)
      }
    }, props.speed)
  })
  </script>