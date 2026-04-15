<template>
    <div class="main-container">
      <!-- 背景图 -->
      <img class="bg-image" src="@/public/static/image/mainbg.jpg" alt="背景图" />
      <audio src="static/music/main.mp3" autoplay loop hidden />
  
      <!-- 顶部栏 -->
      <div class="top-bar">
        <div class="score-box">积分：<span class="score">{{ score }}</span></div>
        <button class="gacha-btn">迷雾千寻</button>
      </div>
  
      <!-- 模式选择按钮 -->
      <div class="mode-container">
        <button class="mode-btn left" @click="goToMode('poem')">锦绣诗链</button>
        <button class="mode-btn right" @click="goToMode('moonverse')">吟霜赋月</button>
      </div>
  
      <!-- 左下角按钮区域 -->
      <div class="left-control">
        <button class="small-btn" @click="goToAbout">关于</button>
        <button class="small-btn" @click="clearAllCookies">清除记录</button>
      </div>
  
      <!-- 结算入口按钮 -->
      <div class="footer-container">
        <button class="final-btn" :disabled="!canReveal" @click="goToMode('rule3')">
          开启命赋之卷
        </button>
        <div v-if="!canReveal" class="hint-text">需完成两个模式各一次才可开启评定</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useCookie } from '#app'
  import { computed } from 'vue'
  
  const scoreCookie = useCookie('poem_score', { default: () => 0 })
  const matchCount1 = useCookie('poem_match_count', { default: () => 0 })
  const matchCount2 = useCookie('poem_match_count2', { default: () => 0 })
  
  const score = ref(scoreCookie.value)
  const router = useRouter()
  
  const goToMode = (mode) => {
    router.push(`/${mode}`)
  }
  const goToGacha = () => {
    router.push('/gacha')
  }
  const goToAbout = () => {
    router.push('/about')
  }
  const clearAllCookies = () => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
    navigateTo('/')
  }
  
  const canReveal = computed(() => matchCount1.value > 0 && matchCount2.value > 0)
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500&display=swap');
  
  .main-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    font-family: 'Noto Serif SC', serif;
    color: #fff;
    overflow: hidden;
  }
  
  .bg-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    filter: brightness(0.75);
    animation: fadeIn 1.5s ease;
  }
  
  .top-bar {
    position: absolute;
    top: 40px;
    left: 50px;
    right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    font-size: 18px;
  }
  
  .score-box {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 18px;
    border-radius: 12px;
    backdrop-filter: blur(6px);
    font-weight: bold;
    font-size: 20px;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
  }
  
  .gacha-btn {
    background: linear-gradient(to right, #ffe3c9, #ffd4a3);
    color: #5c2f00;
    padding: 12px 24px;
    border-radius: 18px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 0 15px rgba(255, 219, 174, 0.6);
    transition: 0.3s;
    border: none;
    cursor: pointer;
  }
  .gacha-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 219, 174, 0.9);
  }
  
  .mode-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 1200px;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    padding: 0 5vw;
    z-index: 10;
  }
  
  .mode-btn {
    width: 40%;
    height: 180px;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 25px;
    border: none;
    transition: 0.3s;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    background: linear-gradient(to right, #e5e9ff9c, #cde7ffa6);
    color: #2c3052;
    backdrop-filter: blur(5px);
    cursor: pointer;
  }
  .mode-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(200, 255, 255, 0.7);
  }
  
  .mode-btn.left {
    margin-right: 20px;
  }
  .mode-btn.right {
    margin-left: 20px;
  }
  
  .footer-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 20;
  }
  
  .left-control {
    position: fixed;
    bottom: 30px;
    left: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 20;
  }
  
  .small-btn {
    padding: 10px 22px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid #fff8cc;
    color: #fffbe7;
    backdrop-filter: blur(8px);
    cursor: pointer;
    transition: all 0.3s;
  }
  .small-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  
  .final-btn {
    padding: 14px 32px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 14px;
    background: linear-gradient(to right, #fff9dc, #ffe7a0);
    border: none;
    color: #4a3200;
    box-shadow: 0 0 12px rgba(255, 245, 194, 0.6);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .final-btn:hover:enabled {
    transform: scale(1.06);
    box-shadow: 0 0 20px rgba(255, 245, 194, 0.9);
  }
  .final-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.15);
    color: #ccc;
  }
  
  .hint-text {
    margin-top: 8px;
    font-size: 0.85rem;
    color: #ffe8c5;
    text-shadow: 0 0 6px #000;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>