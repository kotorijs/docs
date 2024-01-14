<template>
  <span>
    <button @click="click()" style="border: none; padding: 3px; border-radius: 4px; vertical-align: bottom">
      <img style="height: 1.5em; width: 1.5em" src="https://cn.vitejs.dev/voice.svg#voice" />
    </button>
  </span>
</template>

<script setup lang="ts">
function click() {
  const voice = new Audio('/kotori.mp3');
  voice.play();
}
</script>
