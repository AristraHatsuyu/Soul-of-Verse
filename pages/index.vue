<template>
  <div class="video-container">
    <audio src="static/music/index.mp3" autoplay loop hidden />
    <video ref="introVideo" class="bg-video" src="/static/bgvideo.mp4" autoplay muted playsinline />
    <button class="enter-btn" @click="navigateTo('/story')">进入大厅</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const introVideo = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  let rate = 1.0
  const interval = setInterval(() => {
    if (!introVideo.value) return
    if (rate > 0.1) {
      rate -= 0.01
      introVideo.value.playbackRate = rate
    } else {
      introVideo.value.playbackRate = 0
      introVideo.value.pause()
      clearInterval(interval)
    }
  }, 300)
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
}

.enter-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 50px;
  background-color: #c8e4f3;
  border: 4px solid #335e96;
  font-size: 28px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.enter-btn:hover {
  transform: translateX(-50%) scale(1.05);
  background-color: #d7ecf7;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
}
</style>
