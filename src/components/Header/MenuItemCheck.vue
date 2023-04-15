<!-- DropdownMenu.vue -->
<template>
  <div class="item-container no-select">
    <div class="material-symbols-outlined">
      done
    </div>
    <div class="text">{{ text }}</div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, reactive } from "vue";

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: false
    }
})


</script>
  
<style scoped>
.item-container {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}


</style>
  